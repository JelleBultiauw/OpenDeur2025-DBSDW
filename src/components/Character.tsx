import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface CharacterProps {
  position: { x: number; y: number };
}

const Character: React.FC<CharacterProps> = ({ position }) => {
  return (
    <motion.div
      className="absolute"
      animate={{
        x: `${position.x}%`,
        y: `${position.y}%`,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{
        transform: 'translate(-50%, -50%)',
        zIndex: 20
      }}
    >
      <motion.div 
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Bot size={48} className="text-white" />
        <div 
          className="absolute inset-0 blur-xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.3)',
            animation: 'pulse 2s infinite',
          }} 
        />
      </motion.div>
    </motion.div>
  );
};

export default Character;