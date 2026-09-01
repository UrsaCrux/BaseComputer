# bridge_server.py
import asyncio
import websockets
import json
import struct
import random
import time
import csv
import os
from datetime import datetime
from aiohttp import web
from computer.data import (
    IMU_BYTE, GPS_BYTE, BARO_BYTE,
    IMU_ACCEL_SCALE, IMU_GYRO_SCALE, IMU_MAG_SCALE
)
from computer.serial import Transfer

MODO_PRUEBA = False
PORT        = "COM3"
BAUDRATE    = 115200

# CSV
CSV_FOLDER  = "telemetry_logs"
os.makedirs(CSV_FOLDER, exist_ok=True)
CSV_FILE    = os.path.join(CSV_FOLDER, f"telemetry_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
CSV_HEADERS = ["timestamp", "sensor", "variable", "value"]

def init_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(CSV_HEADERS)

def save_to_csv(mediciones):
    with open(CSV_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        for m in mediciones:
            sensor   = m["id"].split(".")[0]
            variable = m["id"].split(".")[1]
            writer.writerow([m["timestamp"], sensor, variable, m["value"]])

# WebSocket
clientes = set()

async def handler(websocket):
    clientes.add(websocket)
    print(f"Cliente conectado | Total: {len(clientes)}")
    try:
        await websocket.wait_closed()
    finally:
        clientes.remove(websocket)

async def broadcast(mensaje: str):
    if clientes:
        await asyncio.gather(*[ws.send(mensaje) for ws in clientes])

# Desempaquetadores
def unpack_imu(data):
    ax, ay, az, gx, gy, gz, mx, my, mz = struct.unpack('>9h', data)
    return [
        {"id": "imu.accel_x", "value": ax * IMU_ACCEL_SCALE},
        {"id": "imu.accel_y", "value": ay * IMU_ACCEL_SCALE},
        {"id": "imu.accel_z", "value": az * IMU_ACCEL_SCALE},
        {"id": "imu.gyro_x",  "value": gx * IMU_GYRO_SCALE},
        {"id": "imu.gyro_y",  "value": gy * IMU_GYRO_SCALE},
        {"id": "imu.gyro_z",  "value": gz * IMU_GYRO_SCALE},
        {"id": "imu.mag_x",   "value": mx * IMU_MAG_SCALE},
        {"id": "imu.mag_y",   "value": my * IMU_MAG_SCALE},
        {"id": "imu.mag_z",   "value": mz * IMU_MAG_SCALE},
    ]

def unpack_gps(data):
    lat, lon, alt = struct.unpack('>iiH', data)
    return [
        {"id": "gps.lat", "value": lat / 1e6},
        {"id": "gps.lon", "value": lon / 1e6},
        {"id": "gps.alt", "value": float(alt)},
    ]

def unpack_baro(data):
    presion, temp, altitud = struct.unpack('>HhH', data)
    return [
        {"id": "baro.presion", "value": presion / 10.0},
        {"id": "baro.temp",    "value": temp    / 100.0},
        {"id": "baro.alt",     "value": altitud / 10.0},
    ]

UNPACKERS = {
    IMU_BYTE:  unpack_imu,
    GPS_BYTE:  unpack_gps,
    BARO_BYTE: unpack_baro,
}

# Modo prueba
async def fake_serial():
    while True:
        ts = int(time.time() * 1000)
        mediciones = [
            {"id": "imu.accel_x", "timestamp": ts, "value": random.uniform(-2, 2)},
            {"id": "imu.accel_y", "timestamp": ts, "value": random.uniform(-2, 2)},
            {"id": "imu.accel_z", "timestamp": ts, "value": random.uniform(8, 10)},
            {"id": "imu.gyro_x",  "timestamp": ts, "value": random.uniform(-1, 1)},
            {"id": "imu.gyro_y",  "timestamp": ts, "value": random.uniform(-1, 1)},
            {"id": "imu.gyro_z",  "timestamp": ts, "value": random.uniform(-1, 1)},
            {"id": "gps.lat",     "timestamp": ts, "value": -33.45 + random.uniform(-0.001, 0.001)},
            {"id": "gps.lon",     "timestamp": ts, "value": -70.66 + random.uniform(-0.001, 0.001)},
            {"id": "gps.alt",     "timestamp": ts, "value": random.uniform(500, 600)},
            {"id": "baro.alt",    "timestamp": ts, "value": random.uniform(500, 600)},
            {"id": "baro.temp",   "timestamp": ts, "value": random.uniform(18, 25)},
            {"id": "baro.presion","timestamp": ts, "value": random.uniform(950, 1013)},
        ]
        for m in mediciones:
            await broadcast(json.dumps(m))
        await asyncio.sleep(0.5)

# Modo real
def leer_serial(queue, loop):
    transfer = Transfer(PORT, baudrate=BAUDRATE, timeout=5)
    for packet in transfer.receive_packets():
        if not packet.crcpass or packet.type not in UNPACKERS:
            continue
        mediciones = UNPACKERS[packet.type](packet.data)
        loop.call_soon_threadsafe(queue.put_nowait, mediciones)

async def procesar_queue(queue):
    while True:
        mediciones = await queue.get()
        ts = int(time.time() * 1000)
        for m in mediciones:
            m["timestamp"] = ts
        save_to_csv(mediciones)
        for m in mediciones:
            await broadcast(json.dumps(m))

# History server
async def handle_history(request):
    key   = request.match_info['key']
    try:
        start = int(float(request.rel_url.query.get('start', 0)))
    except (ValueError, TypeError):
        start = 0
    
    try:
        end   = int(float(request.rel_url.query.get('end', int(time.time() * 1000))))
    except (ValueError, TypeError):
        end = int(time.time() * 1000)

    results = []
    try:
        with open(CSV_FILE, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                ts          = int(row['timestamp'])
                sensor_var  = f"{row['sensor']}.{row['variable']}"
                if sensor_var == key and start <= ts <= end:
                    results.append({"timestamp": ts, "value": float(row['value'])})
    except FileNotFoundError:
        pass

    return web.json_response(results, headers={"Access-Control-Allow-Origin": "*"})

async def run_http():
    app = web.Application()
    app.router.add_get('/history/{key}', handle_history)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, 'localhost', 8766)
    await site.start()
    print("History server corriendo en http://localhost:8766")

# Main
async def main():
    init_csv()
    await run_http()
    async with websockets.serve(handler, "localhost", 8765):
        if MODO_PRUEBA:
            print("Servidor corriendo — modo SIMULACIÓN")
            await fake_serial()
        else:
            print("Servidor corriendo — modo REAL")
            queue = asyncio.Queue()
            loop  = asyncio.get_event_loop()
            loop.run_in_executor(None, leer_serial, queue, loop)
            await procesar_queue(queue)

asyncio.run(main())