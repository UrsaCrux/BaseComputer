void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
}

void printBinary16(uint16_t value) {
  for (int i = 15; i >= 0; i--) {
    Serial.print(bitRead(value, i));
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  while (1){
    uint16_t randnum = (uint16_t)esp_random();
    uint8_t code = 0b10101010;
    Serial.print(code, BIN);
    printBinary16(randnum);
    Serial.println();
    delay(1000);
  }
}
