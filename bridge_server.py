# bridge_server.py
import asyncio
import websockets
import json
import struct
import random
import time

from computer.communication import Transfer, IMU_TYPE, GPS_TYPE, BARO_TYPE

# config.
MODO_PRUEBA = True   # True = datos falsos , False = serial real
PORT        = "/dev/ttyUSB0"  # solo importa si MODO_PRUEBA = False
BAUDRATE    = 115200


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

# desempaquetadores 
def unpack_imu(data):
    ax, ay, az, gx, gy, gz, mx, my, mz = struct.unpack('>9f', data)
    return [
        {"id": "imu.accel_x", "value": ax},
        {"id": "imu.accel_y", "value": ay},
        {"id": "imu.accel_z", "value": az},
        {"id": "imu.gyro_x",  "value": gx},
        {"id": "imu.gyro_y",  "value": gy},
        {"id": "imu.gyro_z",  "value": gz},
        {"id": "imu.mag_x",   "value": mx},
        {"id": "imu.mag_y",   "value": my},
        {"id": "imu.mag_z",   "value": mz},
    ]

def unpack_gps(data):
    lat, lon, alt, speed = struct.unpack('>4f', data)
    return [
        {"id": "gps.lat",   "value": lat},
        {"id": "gps.lon",   "value": lon},
        {"id": "gps.alt",   "value": alt},
        {"id": "gps.speed", "value": speed},
    ]

def unpack_baro(data):
    presion, temp, altitud = struct.unpack('>3f', data)
    return [
        {"id": "baro.presion", "value": presion},
        {"id": "baro.temp",    "value": temp},
        {"id": "baro.alt",     "value": altitud},
    ]

UNPACKERS = {
    IMU_TYPE:  unpack_imu,
    GPS_TYPE:  unpack_gps,
    BARO_TYPE: unpack_baro,
}

# modo prueba 
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

# modo real
def leer_serial(queue, loop):
    transfer = Transfer(PORT, baudrate=BAUDRATE, timeout=5)
    for packet in transfer.receive_packets():
        if not packet.crcpass or packet.type not in UNPACKERS:
            continue
        mediciones = UNPACKERS[packet.type](packet.data)
        ts = int.from_bytes(packet.timestamp, 'big') * 1000
        for m in mediciones:
            m["timestamp"] = ts
        loop.call_soon_threadsafe(queue.put_nowait, mediciones)

async def procesar_queue(queue):
    while True:
        mediciones = await queue.get()
        for m in mediciones:
            await broadcast(json.dumps(m))

# main
async def main():
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