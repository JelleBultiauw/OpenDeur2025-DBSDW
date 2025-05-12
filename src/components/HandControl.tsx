import React, { useState, useEffect, useRef } from 'react';

interface HandControlProps {
  projectColor: string;
}

const HandControl: React.FC<HandControlProps> = ({ projectColor }) => {
  // Load initial angles from localStorage or use default values
  const [angles, setAngles] = useState<number[]>(() => {
    const savedAngles = localStorage.getItem('handControlAngles');
    return savedAngles ? JSON.parse(savedAngles) : [90, 90, 90, 90];
  });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const knobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Save angles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('handControlAngles', JSON.stringify(angles));
  }, [angles]);

  useEffect(() => {
    // Connect to WebSocket server
    const websocket = new WebSocket('ws://localhost:8765');
    
    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
      // Send current angles when connecting
      angles.forEach((angle, index) => {
        const letter = ['i', 'm', 'r', 'p'][index];
        const message = `<${letter}${angle}>`;
        websocket.send(message);
      });
    };

    websocket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleSliderChange = (index: number, value: number) => {
    const newAngles = [...angles];
    newAngles[index] = value;
    setAngles(newAngles);

    // Send the updated angle to the WebSocket server
    if (ws && ws.readyState === WebSocket.OPEN) {
      const letter = ['i', 'm', 'r', 'p'][index];
      const message = `<${letter}${value}>`;
      ws.send(message);
    }
  };

  const calculateAngle = (e: React.MouseEvent | MouseEvent, knob: HTMLDivElement) => {
    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    return (angle + 90 + 360) % 360;
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setDragging(index);
    const knob = knobRefs.current[index];
    if (knob) {
      const angle = calculateAngle(e, knob);
      handleSliderChange(index, Math.round(angle * 0.5)); // Scale 0-360 to 0-180
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging !== null) {
      const knob = knobRefs.current[dragging];
      if (knob) {
        const angle = calculateAngle(e, knob);
        handleSliderChange(dragging, Math.round(angle * 0.5)); // Scale 0-360 to 0-180
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging]);

  const fingers = ["Wijsvinger", "Middelvinger", "Ringvinger", "Pink"];

  return (
    <div className="mt-6">
      <h3 className="text-gray-400 text-lg mb-3">Hand Besturing</h3>
      <div className="flex flex-col gap-4">
        {fingers.map((finger, index) => (
          <div key={finger} className="flex items-center gap-4">
            <div className="w-16 flex-shrink-0">
              <div className="text-gray-300 font-medium">{finger}</div>
              <div className="text-gray-400 text-sm">{angles[index]}°</div>
            </div>
            <div 
              ref={el => knobRefs.current[index] = el}
              className="relative w-16 h-16 cursor-pointer select-none flex-shrink-0"
              onMouseDown={(e) => handleMouseDown(e, index)}
            >
              {/* Knob base */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{ 
                  background: `conic-gradient(${projectColor} ${angles[index] * 2}deg, ${projectColor}30 ${angles[index] * 2}deg)`,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                }}
              />
              {/* Knob indicator */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `rotate(${angles[index] * 2}deg)` }}
              >
                <div 
                  className="w-1 h-6 rounded-full"
                  style={{ 
                    backgroundColor: projectColor,
                    transform: 'translateY(-3px)',
                    boxShadow: '0 0 5px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
              {/* Knob center */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
              >
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ 
                    backgroundColor: '#1a1a1a',
                    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandControl; 