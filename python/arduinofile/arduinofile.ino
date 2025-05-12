#include <Servo.h>

Servo indexServo, middleServo, ringServo, pinkyServo;

Servo* servos[] = {&indexServo, &middleServo, &ringServo, &pinkyServo};
int lastAngles[] = {90, 90, 90, 90};

char receivedData[20]; // buffer to hold incoming data
int dataIndex = 0;

void setup() {
  Serial.begin(9600);

  // Attach servos to pins
  indexServo.attach(12);
  middleServo.attach(11);
  ringServo.attach(10);
  pinkyServo.attach(9);

  // Set initial position
  for (int i = 0; i < 4; i++) {
    servos[i]->write(lastAngles[i]);
  }
}

void loop() {
  if (Serial.available()) {
    char c = Serial.read();

    if (c == '<') {
      dataIndex = 0;
    } else if (c == '>') {
      receivedData[dataIndex] = '\0';
      parseCommand(receivedData);
    } else if (dataIndex < 18) {
      receivedData[dataIndex++] = c;
    }
  }
}

void parseCommand(char* cmd) {
  char finger = cmd[0];
  int angle = atoi(cmd + 1);

  int servoIndex = -1;
  switch (finger) {
    case 'i': servoIndex = 0; break;
    case 'm': servoIndex = 1; break;
    case 'r': servoIndex = 2; break;
    case 'p': servoIndex = 3; break;
  }

  if (servoIndex >= 0 && angle >= 0 && angle <= 180) {
    servos[servoIndex]->write(angle);
    lastAngles[servoIndex] = angle;
  }
}