# Open Deur 2025 Project

Dit project bevat een interactieve website met een handbesturingssysteem dat servomotoren aanstuurt via een Arduino.

## Benodigdheden

### Hardware
- Arduino (bijv. Arduino Uno)
- 4x Servomotoren
- USB-kabel voor Arduino
- Voeding voor servomotoren (indien nodig)

### Software
- Node.js (versie 16 of hoger)
- Python 3.8 of hoger
- Arduino IDE

### Python Packages
```bash
pip install websockets pyserial
```

## Installatie

1. Clone de repository:
```bash
git clone https://github.com/[jouw-username]/OpenDeur2025.git
cd OpenDeur2025
```

2. Installeer de Node.js dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm run dev
```

4. In een apart terminal venster, start de WebSocket server:
```bash
python python/websocket_server.py
```

## Arduino Setup

1. Open de Arduino IDE
2. Verbind de Arduino met je computer
3. Controleer of de juiste COM-poort is geselecteerd
4. Upload de Arduino code (te vinden in de `arduino` map)

## Gebruik

1. Open de website in je browser (standaard op `http://localhost:5173`)
2. Navigeer naar het "Mind Hand Control" project
3. Gebruik de draaiknoppen om de servomotoren te besturen:
   - Wijsvinger
   - Middelvinger
   - Ringvinger
   - Pink

## Technische Details

- Frontend: React met TypeScript
- Backend: Python WebSocket server
- Communicatie: WebSocket tussen website en Python server
- Hardware communicatie: Serial tussen Python en Arduino

## Problemen Oplossen

1. Als de servomotoren niet reageren:
   - Controleer of de Arduino is aangesloten
   - Controleer of de juiste COM-poort is ingesteld in `websocket_server.py`
   - Herstart de WebSocket server

2. Als de website niet verbindt:
   - Controleer of de WebSocket server draait
   - Controleer of de juiste poort (8765) beschikbaar is

## Licentie

Dit project is gemaakt voor Open Deur 2025. 