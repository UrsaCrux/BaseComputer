# UrsaCrux - BaseComputer

## Overview
This repository contains the Base Computer software for the UrsaCrux project. It encompasses the core logic to communicate with external microcontrollers and visualizers.

## Project Structure
- `computer/`: Contains core Python modules for communication and data processing (`communication.py`, `data.py`, `sender.py`).
- `tests/`: Testing scripts and mock visualizers.
- `visualizer/`: Components for data visualization.
- `external_microcontroller/`: Firmware/code for the external microcontrollers.
- `sketch_sep14a/`: Arduino/Microcontroller sketch files.

## Getting Started

### Requirements
- Python 3.x
- Arduino IDE (if compiling the sketches)
- Node.js 16+

### Setup
1. Clone the repository.
2. Install necessary Python dependencies.
3. Run the base computer scripts located in the `computer/` directory.

## Architecture

```
[Rocket — Flight Computer]
   ↓ serial / LoRa (915 MHz)
[bridge_server.py]
   ↓ WebSocket (ws://localhost:8765)
[OpenMCT — browser]
```

`bridge_server.py` receives binary packets from the rocket over serial, unpacks them, and broadcasts them as JSON to OpenMCT via WebSocket.

## Supported Sensors

| Type | Sensor | Payload | Variables |
|------|--------|---------|-----------|
| `0x01` | IMU (MPU-9250) | 36 bytes | accel xyz, gyro xyz, mag xyz |
| `0x02` | GPS (NEO-6M) | 16 bytes | lat, lon, alt, speed |
| `0x03` | Barometer (BME280) | 12 bytes | pressure, temp, altitude |

## Packet Protocol (PHUC)

```
[HEAD 0x14][TYPE 1B][TIMESTAMP 4B][DATA N bytes][CRC 2B]
```

## Project Structure

```
BaseComputer/
├── computer/               # Core Python modules
│   ├── communication.py    # PHUC protocol, Transfer, Packet
│   ├── data.py             # Data processing
│   └── sender.py           # Packet sender
├── openmct_config/         # Telemetry visualizer (OpenMCT)
│   ├── node_modules/       # Frontend dependencies (not tracked)
│   ├── package.json
│   ├── index.html          # OpenMCT entry point
│   ├── dictionary.json     # Telemetry variable definitions
│   └── telemetry_plugin.js # WebSocket plugin for OpenMCT
├── tests/                  # Testing scripts and mock visualizers
├── sketch_sep14a/          # Arduino/Microcontroller sketch files
├── logs/                   # Flight data logs
├── bridge_server.py        # WebSocket server + serial reader
├── test_ws.py              # WebSocket connection test
├── requirements.txt        # Python dependencies
└── README.md
```

## Extended installation

1. Clone the repository:
```bash
git clone <repo-url>
cd BaseComputer
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd openmct_config
npm install
```

## Running the System

### Simulation mode (no hardware)

Make sure `bridge_server.py` has:
```python
MODO_PRUEBA = True
```

**Terminal 1 — WebSocket server:**
```bash
python bridge_server.py
```

**Terminal 2 — HTTP server:**
```bash
cd openmct_config
python -m http.server 8080
```

Open in browser:
```
http://localhost:8080
```

### Real mode (with LoRa hardware)

Change in `bridge_server.py`:
```python
MODO_PRUEBA = False
PORT = "/dev/ttyUSB0"  # Linux
# PORT = "COM3"        # Windows
```

Then run the same as simulation mode.

### Verify WebSocket connection

```bash
python test_ws.py
```

You should see 5 lines of JSON with sensor data.

## Adding New Packet Types

1. Add the type in `computer/communication.py`:
```python
NEW_TYPE = b"\x04"
TYPES_PAYLOAD = {
    ...
    NEW_TYPE: N,  # payload size in bytes
}
```

2. Add the unpacker in `bridge_server.py`:
```python
def unpack_new(data):
    val1, val2 = struct.unpack('>2f', data)
    return [
        {"id": "new.val1", "value": val1},
        {"id": "new.val2", "value": val2},
    ]
```

3. Add the variable in `openmct_config/dictionary.json`.

## License

See the `LICENSE` file for more details.