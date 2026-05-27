#include <stdint.h>
#include <string.h>

// Constantes PHUC
#define HEAD      0x14
#define IMU_TYPE  0x01
#define GPS_TYPE  0x02
#define BARO_TYPE 0x03

// CRC16-CCITT
uint16_t crc16(uint8_t *data, uint16_t len) {
  uint16_t crc = 0xFFFF;
  for (uint16_t i = 0; i < len; i++) {
    crc ^= (uint16_t)data[i] << 8;
    for (uint8_t j = 0; j < 8; j++) {
      if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
      else crc <<= 1;
    }
    crc &= 0xFFFF;
  }
  return crc;
}

void sendPacket(uint8_t type, uint8_t *data, uint8_t data_len) {
  uint32_t ts = millis(); // uint32_t ocupa 4 bytes nativos

  // Buffer para CRC: HEAD(1) + TYPE(1) + TS(4) + DATA(data_len)
  uint16_t crc_len = 1 + 1 + 4 + data_len;
  uint8_t to_crc[crc_len];
  
  to_crc[0] = HEAD;
  to_crc[1] = type;
  // Descomponemos el timestamp en 4 bytes exactos (MSB a LSB)
  to_crc[2] = (ts >> 24) & 0xFF;
  to_crc[3] = (ts >> 16) & 0xFF;
  to_crc[4] = (ts >> 8)  & 0xFF;
  to_crc[5] =  ts        & 0xFF;
  memcpy(&to_crc[6], data, data_len);

  uint16_t crc = crc16(to_crc, crc_len);

  // Enviar paquete estructurado al puerto serie
  Serial.write(HEAD);
  Serial.write(type);
  Serial.write(&to_crc[2], 4); // Enviamos los 4 bytes del timestamp
  Serial.write(data, data_len);
  Serial.write(crc >> 8);
  Serial.write(crc & 0xFF);
}

void sendIMU() {
  // Simula MPU9250: 18 bytes en total
  int16_t ax = random(-200, 200);
  int16_t ay = random(-200, 200);
  int16_t az = 980 + random(-10, 10);
  int16_t gx = random(-50, 50);
  int16_t gy = random(-50, 50);
  int16_t gz = random(-50, 50);
  int16_t mx = random(-300, 300);
  int16_t my = random(-300, 300);
  int16_t mz = random(-300, 300);

  uint8_t data[18]; // 18 bytes
  data[0]  = ax >> 8; data[1]  = ax & 0xFF;
  data[2]  = ay >> 8; data[3]  = ay & 0xFF;
  data[4]  = az >> 8; data[5]  = az & 0xFF;
  data[6]  = gx >> 8; data[7]  = gx & 0xFF;
  data[8]  = gy >> 8; data[9]  = gy & 0xFF;
  data[10] = gz >> 8; data[11] = gz & 0xFF;
  data[12] = mx >> 8; data[13] = mx & 0xFF;
  data[14] = my >> 8; data[15] = my & 0xFF;
  data[16] = mz >> 8; data[17] = mz & 0xFF;

  sendPacket(IMU_TYPE, data, 18);
}

void sendGPS() {
  // Simula NEO-6M: 10 bytes en total
  int32_t lat = -33300000 + random(-1000, 1000);
  int32_t lon = -70600000 + random(-1000, 1000);
  uint16_t alt = 500 + random(-5, 5);

  uint8_t data[10]; // 10 bytes
  data[0] = (lat >> 24) & 0xFF;
  data[1] = (lat >> 16) & 0xFF;
  data[2] = (lat >> 8)  & 0xFF;
  data[3] =  lat        & 0xFF;
  data[4] = (lon >> 24) & 0xFF;
  data[5] = (lon >> 16) & 0xFF;
  data[6] = (lon >> 8)  & 0xFF;
  data[7] =  lon        & 0xFF;
  data[8] =  alt >> 8;
  data[9] =  alt & 0xFF;

  sendPacket(GPS_TYPE, data, 10);
}

void sendBARO() {
  // Simula BME280: 6 bytes en total
  uint16_t presion = 10130 + random(-10, 10);
  int16_t  temp    = 2000 + random(-50, 50);
  uint16_t alt     = 5000 + random(-10, 10);

  uint8_t data[6]; // 6 bytes
  data[0] = presion >> 8; data[1] = presion & 0xFF;
  data[2] = temp    >> 8; data[3] = temp    & 0xFF;
  data[4] = alt     >> 8; data[5] = alt     & 0xFF;

  sendPacket(BARO_TYPE, data, 6);
}

void setup() {
  Serial.begin(115200);
  randomSeed(analogRead(0));
}

void loop() {
  sendIMU();
  delay(100);
  
  sendBARO();
  delay(100);

  sendGPS();
  delay(800);
}