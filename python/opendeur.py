import sys
import serial
import time
from PyQt5.QtWidgets import QApplication, QWidget, QSlider, QLabel, QVBoxLayout, QHBoxLayout
from PyQt5.QtCore import Qt

class ServoControl(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Hand Servo Controller")

        # Change COM port as needed
        self.ser = serial.Serial('COM9', 9600, timeout=1)
        time.sleep(2)  # Give Arduino time to initialize

        self.sliders = []
        self.current_angles = [90, 90, 90, 90]  # Keep track of each servo's angle

        layout = QVBoxLayout()

        fingers = ["Index", "Middle", "Ring", "Pinky"]
        for i, name in enumerate(fingers):
            h_layout = QHBoxLayout()
            label = QLabel(f"{name}: {self.current_angles[i]}°")
            slider = QSlider(Qt.Horizontal)
            slider.setRange(0, 180)
            slider.setValue(self.current_angles[i])
            slider.valueChanged.connect(lambda val, idx=i, lbl=label: self.update_servo(val, idx, lbl))

            self.sliders.append(slider)
            h_layout.addWidget(label)
            h_layout.addWidget(slider)
            layout.addLayout(h_layout)

        self.setLayout(layout)

    def update_servo(self, angle, servo_id, label):
        # Update stored angle and label
        self.current_angles[servo_id] = angle
        label.setText(f"{label.text().split(':')[0]}: {angle}°")

        # Send only updated angle
        self.send_angle(servo_id, angle)

    def send_angle(self, servo_id, angle):
        # Send only the updated finger
        letter = ['i', 'm', 'r', 'p'][servo_id]
        msg = f"<{letter}{angle}>\n"  # e.g., "<i120>" or "<p45>"
        self.ser.write(msg.encode())
        print("Sent:", msg)

    def closeEvent(self, event):
        # Optional: Reset servos on exit
        for angle in [90]*4:
            self.send_angle(angle)
        self.ser.close()
        event.accept()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = ServoControl()
    window.show()
    sys.exit(app.exec_())