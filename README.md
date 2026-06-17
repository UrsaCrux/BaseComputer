
# BaseComputerLiz — Fork para Proyecto Hermes

Fork de [BaseComputer](https://github.com/ursacrux/BaseComputer) adaptado para el **Proyecto Hermes** (globo aerostático), con cambios en el protocolo de paquetes binarios PHUC para optimizar la transmisión vía **LoRa SX1262**.

----

## ¿Qué cambió respecto al original?

### 1. Protocolo PHUC adaptado para LoRa (`computer/communication.py`)

El protocolo original usaba `float32` ahora usa int(16-32)

| Sensor | Original | Hermes | Reducción |
|--------|----------|--------|-----------|
| IMU (MPU9250) | 36B (9×float32) | 18B (9×int16) | -50% |
| GPS (NEO-6M) | 16B (4×float32) | 10B (2×int32 + int16) | -37% |
| Barómetro (BME280) | 12B (3×float32) | 6B (uint16+int16+uint16) | -50% |
| **Total por ciclo** | **124B** | **55B** | **-56%** |


#### Factores de escala usados;

| Sensor | Tipo | Escala | Unidad |
|--------|------|--------|--------|
| Acelerómetro | int16 | ÷ 100 | m/s² |
| Giroscopio | int16 | ÷ 100 | °/s |
| Magnetómetro | int16 | ÷ 10 | µT |
| Latitud/Longitud | int32 | ÷ 1e6 | ° (precisión 0.11m) |
| Altitud GPS | uint16 | × 1 | m |
| Presión | uint16 | ÷ 10 | Pa |
| Temperatura | int16 | ÷ 100 | °C |
| Altitud baro | uint16 | ÷ 10 | m |

### 2. Fix en verificación CRC (`computer/data.py`)

La función `crc_check` original comparaba el CRC calculado contra los últimos 2 bytes del DATA en vez del CRC separado. Se corrigió la firma para recibir el CRC esperado como parámetro independiente:

```python
# Antes (bugueado)
def crc_check(data: bytes) -> bool:
    ...
    if crc.to_bytes(2, 'big') == data[-2:]:  # comparaba contra el data

# Después (correcto)
def crc_check(data: bytes, expected_crc: bytes) -> bool:
    ...
    return crc.to_bytes(2, 'big') == expected_crc  # compara contra el CRC real
```

### 3. Timestamp sincronizado con el PC (`bridge_server.py`)

El Arduino usa `millis()` que cuenta desde que se enciende. OpenMCT necesita timestamps Unix reales. El bridge ahora reemplaza el timestamp del paquete con el reloj del PC:

```python
# En procesar_queue()
ts = int(time.time() * 1000)  # tiempo real del PC en ms
```

### 4. Nuevas funciones unpack (`bridge_server.py`)

Se actualizaron `unpack_imu()`, `unpack_gps()` y `unpack_baro()` para deserializar los nuevos tipos enteros y aplicar los factores de escala correctos.

---

## Cómo correr el sistema

### Requisitos
- Python 3.12+
- Node.js
- `pip install pyserial websockets`

### Pasos

**Terminal 1 — Bridge serial:**
```bash
cd BaseComputerLiz
python bridge_server.py
```

**Terminal 2 — OpenMCT:**
```bash
cd BaseComputerLiz/openmct_config
npx http-server . -p 8080
```

Abrir en Chrome: **http://127.0.0.1:8080**

### Configuración en `bridge_server.py`

```python
MODO_PRUEBA = False   # True = datos falsos, False = serial real
PORT        = "COM3"  # Puerto serial del Arduino/Raspberry Pi
BAUDRATE    = 115200
```

---

## Stack completo

```
[Sensor / Arduino]
      ↓ serial (PHUC binario)
[bridge_server.py]
      ↓ WebSocket ws://localhost:8765
[OpenMCT]
```

---

## Sensores soportados

| Sensor | Chip | Tipo paquete |
|--------|------|-------------|
| IMU | MPU9250 | `0x01` |
| GPS | NEO-6M | `0x02` |
| Barómetro | BME280 | `0x03` |

---

## Pendiente para Hermes

- [ ] Conectar sensores reales (MPU9250, NEO-6M, BME280)
- [ ] Migrar de Arduino Uno a Raspberry Pi
- [ ] Integrar módulo LoRa SX1262
- [ ] Agregar empaquetado GPS y BARO en el firmware
- [ ] Validar CRC en condiciones de ruido RF
## License

See the `LICENSE` file for more details.
