import React from 'react';
import { Project } from '../data/projects';
import { motion } from 'framer-motion';

interface RoadmapNodeProps {
  project: Project;
  onClick: (project: Project) => void;
  isSelected: boolean;
  showAll: boolean;
  isRevealed: boolean;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ project, onClick, isSelected, showAll, isRevealed }) => {
  const isVisible = showAll || isRevealed;
  const nodeSize = showAll ? 'w-8 h-8' : 'w-16 h-16';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute z-10 cursor-pointer"
      style={{
        left: `${project.position.x}%`,
        top: `${project.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={() => onClick(project)}
    >
      <div
        className={`relative ${nodeSize} rounded-full transition-all duration-300 ${
          isSelected ? 'scale-125' : 'hover:scale-110'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: `2px solid rgba(255, 255, 255, ${isSelected ? '1' : '0.5'})`,
          boxShadow: `0 0 ${isSelected ? '30px' : '20px'} rgba(255, 255, 255, ${isSelected ? '0.5' : '0.3'})`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default RoadmapNode;