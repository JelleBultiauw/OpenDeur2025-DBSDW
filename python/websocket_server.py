import asyncio
import websockets
import serial
import time

# Initialize serial connection to Arduino
try:
    ser = serial.Serial('COM9', 9600, timeout=1)
    time.sleep(2)  # Give Arduino time to initialize
    print("Successfully connected to Arduino")
except serial.SerialException as e:
    print(f"Error connecting to Arduino: {e}")
    exit(1)

# Keep track of current servo positions
current_positions = {'i': 90, 'm': 90, 'r': 90, 'p': 90}

async def handle_websocket(websocket):
    print("Client connected")
    try:
        async for message in websocket:
            try:
                # Forward the message directly to the Arduino
                ser.write(message.encode())
                print(f"Sent to Arduino: {message}")
                
                # Update our position tracking
                if message.startswith('<') and message.endswith('>'):
                    letter = message[1]
                    angle = int(message[2:-1])
                    current_positions[letter] = angle
            except serial.SerialException as e:
                print(f"Error sending to Arduino: {e}")
                await websocket.send(f"Error: {str(e)}")
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
    except Exception as e:
        print(f"Error in websocket handler: {e}")

async def main():
    try:
        async with websockets.serve(handle_websocket, "localhost", 8765):
            print("WebSocket server started on ws://localhost:8765")
            await asyncio.Future()  # run forever
    except Exception as e:
        print(f"Error starting WebSocket server: {e}")
    finally:
        try:
            ser.close()
        except:
            pass

if __name__ == "__main__":
    asyncio.run(main()) 