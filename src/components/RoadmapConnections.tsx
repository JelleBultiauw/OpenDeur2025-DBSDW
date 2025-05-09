import React from 'react';
import { Project } from '../data/projects';
import { motion } from 'framer-motion';

interface ConnectionsProps {
  projects: Project[];
  revealedNodes: string[];
  showAll: boolean;
  isCharacterMoving: boolean;
}

const RoadmapConnections: React.FC<ConnectionsProps> = ({ projects, revealedNodes, showAll, isCharacterMoving }) => {
  const projectsMap = projects.reduce((acc, project) => {
    acc[project.id] = project;
    return acc;
  }, {} as Record<string, Project>);

  const createSmoothPath = (x1: number, y1: number, x2: number, y2: number) => {
    // For vertical connections, we'll use a simple curve
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  };

  const connectionLines = projects.flatMap(project => 
    project.connections.map(targetId => {
      const target = projectsMap[targetId];
      if (!target) return null;
      
      // Only show connection if both nodes are revealed or showAll is true
      if (!showAll && (!revealedNodes.includes(project.id) || !revealedNodes.includes(targetId))) {
        return null;
      }

      const x1 = project.position.x;
      const y1 = project.position.y;
      const x2 = target.position.x;
      const y2 = target.position.y;

      return (
        <motion.path
          key={`${project.id}-${targetId}`}
          d={createSmoothPath(x1, y1, x2, y2)}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.7
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
          fill="none"
          stroke="white"
          strokeLinecap="round"
          style={{
            filter: 'url(#glow)',
            pointerEvents: 'none',
            strokeWidth: isCharacterMoving ? 6 : 4,
            willChange: 'pathLength, opacity'
          }}
        />
      );
    })
  ).filter(Boolean);

  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      viewBox="0 0 100 150"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {connectionLines}
    </svg>
  );
};

export default RoadmapConnections;