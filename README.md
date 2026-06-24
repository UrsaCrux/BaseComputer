# BaseComputer — Proyecto Hermes

Este es un fork de [BaseComputer](https://github.com/ursacrux/BaseComputer) adaptado para el **Proyecto Hermes** (globo aerostático), con cambios en el protocolo de paquetes binarios PHUC para optimizar la transmisión de telemetría a través de **LoRa SX1262**.

---

## 1. Estructura y Módulo Python (`computer`)

El sistema cuenta con un paquete local de Python llamado `computer` que encapsula la lógica de comunicación serial y la estructura de los datos de los sensores.

### Componentes del Módulo:
* **[data.py](computer/data.py)**: Define los tipos de datos (`IMU`, `GPS`, `Barometer` que heredan de `DataType`), el formato de paquete general (`Packet`), y los factores de escala necesarios para decodificar la información binaria.
* **[serial.py](computer/serial.py)**: Implementa la clase `Transfer` encargada de gestionar la conexión serial de manera robusta usando `pyserial`.

### Instalación Local del Paquete:
Para poder importar `computer` en scripts externos (como el servidor puente), debes instalarlo localmente en tu entorno de Python.

Desde el directorio raíz del proyecto:
```bash
pip install -e ./computer
```

O navegando directamente a la carpeta del paquete:
```bash
cd computer
pip install -e .
```

*Nota: La opción `-e` (editable) permite que cualquier cambio realizado en el código del módulo `computer` se aplique inmediatamente sin necesidad de reinstalar.*

---

## 2. Inconsistencias Detectadas entre el Código y el Simulador

Para el correcto desarrollo e integración con firmware, se deben tener en cuenta las siguientes discrepancias actuales en la base de código:

### A. Tipos de Paquetes (Bytes Identificadores)
Existe un desfase en los identificadores de tipo de paquete entre la definición de Python y la del firmware simulador de Arduino:

| Sensor | Python (`computer/data.py`) | Arduino (`Arduinopruebasensores.ino`) |
| :--- | :---: | :---: |
| **IMU** | `0x00` (`IMU_BYTE`) | `0x01` (`IMU_TYPE`) |
| **GPS** | `0x01` (`GPS_BYTE`) | `0x02` (`GPS_TYPE`) |
| **Barómetro** | `0x02` (`BARO_BYTE`) | `0x03` (`BARO_TYPE`) |

> [!WARNING]
> Dado que el servidor `bridge_server.py` utiliza las constantes de `computer/data.py` (`0x00`, `0x01`, `0x02`) para registrar los deserializadores en el diccionario `UNPACKERS`, los paquetes reales enviados por el Arduino con ID `0x01`, `0x02` y `0x03` no serán reconocidos a menos que se sincronicen ambos lados.

### B. Tamaño del Payload de GPS
* En `computer/data.py`, el tamaño del payload de GPS está configurado como `GPS_PAYLOAD = 0 # Not defined yet`.
* Sin embargo, tanto el simulador Arduino (`Arduinopruebasensores.ino`) como el desempaquetador `unpack_gps` en `bridge_server.py` esperan un payload de **10 bytes** (`struct.unpack('>iiH', data)` de 2 enteros de 4 bytes y 1 entero de 2 bytes).

---

## 3. Protocolo de Paquetes Binarios (PHUC)

El protocolo original usaba variables de tipo `float32` (4 bytes). Para optimizar el ancho de banda en la transmisión por LoRa, se migraron a enteros con escala (`int16` e `int32`), logrando una reducción significativa del tamaño del paquete.

### Estructura del Paquete
```
[HEADER 1B] [TYPE 1B] [TIMESTAMP 4B] [DATA 0-128B] [CRC 2B]
```

### Comparación de Tamaños de Payload (Datos)

| Sensor | Formato Original | Formato Hermes | Reducción |
| :--- | :--- | :--- | :---: |
| **IMU (MPU9250)** | 36B (9 × float32) | 18B (9 × int16) | **-50%** |
| **GPS (NEO-6M)** | 16B (4 × float32) | 10B (2 × int32 + int16) | **-37%** |
| **Barómetro (BME280)** | 12B (3 × float32) | 6B (uint16 + int16 + uint16) | **-50%** |
| **Total de Telemetría** | **64B** | **34B** | **-46.8%** |

### Factores de Escala

| Sensor | Tipo de Dato | Escala / Operación | Unidad Real |
| :--- | :--- | :--- | :---: |
| **Acelerómetro** | `int16` | Valor × `0.01` (÷ 100) | m/s² |
| **Groscopio** | `int16` | Valor × `0.01` (÷ 100) | °/s |
| **Magnetómetro** | `int16` | Valor × `0.1` (÷ 10) | µT |
| **Latitud / Longitud** | `int32` | Valor / `1e6` | Grados (°) |
| **Altitud GPS** | `uint16` | Valor directo | Metros (m) |
| **Presión** | `uint16` | Valor × `0.1` (÷ 10) | Pa |
| **Temperatura** | `int16` | Valor × `0.01` (÷ 100) | °C |
| **Altitud Barométrica** | `uint16` | Valor × `0.1` (÷ 10) | Metros (m) |

---

## 4. Instrucciones de Ejecución

### Requisitos Previos
* **Python 3.12+**
* **Node.js**

### Instalación de Dependencias
Instala los paquetes necesarios de Python:
```bash
pip install -r requirements.txt
```
*Nota: Asegúrate de tener instalado también `aiohttp` si vas a utilizar el servidor de historial integrado:*
```bash
pip install aiohttp
```

### Pasos para Levantar el Sistema

#### Paso 1: Iniciar el Bridge Telemetría (Python)
Este puente lee del puerto serial o simula datos en tiempo real, guarda los registros en un archivo CSV en la carpeta `telemetry_logs`, y los retransmite a través de WebSockets.

```bash
# Ejecutar desde el directorio raíz
python OpenMCT/bridge_server.py
```

*Configuraciones en `OpenMCT/bridge_server.py`:*
* `MODO_PRUEBA = True` para simular datos internamente sin necesidad de conectar hardware.
* `PORT = "COM3"` y `BAUDRATE = 115200` para comunicación real por puerto serial.

#### Paso 2: Iniciar OpenMCT (Node.js/Web)
Instala las dependencias de OpenMCT y levanta el servidor local:

```bash
cd OpenMCT/openmct_config
npm install
npx http-server . -p 8080
```

#### Paso 3: Visualización
Abre tu navegador de preferencia (recomendado Chrome) e ingresa a:
**[http://127.0.0.1:8080](http://127.0.0.1:8080)**

---

## 5. Puertos Utilizados

* **`8080`**: Servidor HTTP local de la interfaz de OpenMCT.
* **`8765`**: Servidor WebSocket de datos en tiempo real.
* **`8766`**: Servidor de Historial (History Provider) REST API para consulta de datos históricos desde el CSV.
