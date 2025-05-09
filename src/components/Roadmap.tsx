import React, { useState, useEffect, useRef } from 'react';
import { projects, Project } from '../data/projects';
import RoadmapNode from './RoadmapNode';
import RoadmapConnections from './RoadmapConnections';
import ProjectDetails from './ProjectDetails';

interface RoadmapProps {
  showAll: boolean;
  onShowAllChange: (showAll: boolean) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ showAll, onShowAllChange }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const [revealedNodes, setRevealedNodes] = useState<string[]>(['p1', 'p2']);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize revealed nodes when component mounts
  useEffect(() => {
    if (selectedProject) {
      const newRevealedNodes = ['p1'];
      selectedProject.connections.forEach(id => {
        if (!newRevealedNodes.includes(id)) {
          newRevealedNodes.push(id);
        }
      });
      setRevealedNodes(newRevealedNodes);
    }
  }, []);

  const handleNodeClick = (project: Project) => {
    setSelectedProject(project);
    
    // Reveal connected nodes
    const newRevealedNodes = [...revealedNodes];
    project.connections.forEach(id => {
      if (!newRevealedNodes.includes(id)) {
        newRevealedNodes.push(id);
      }
    });
    setRevealedNodes(newRevealedNodes);
  };

  const handleKeyNavigation = (e: KeyboardEvent) => {
    // Prevent default scroll behavior for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }

    if (!selectedProject) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNodeClick(projects[0]);
      }
      return;
    }

    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentIndex < projects.length - 1) {
      handleNodeClick(projects[currentIndex + 1]);
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentIndex > 0) {
      handleNodeClick(projects[currentIndex - 1]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [selectedProject]);

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  // Calculate the transform to center the selected node
  const getContainerTransform = () => {
    if (showAll) return 'scale(0.8)';
    if (!selectedProject) return 'translateY(0)';
    const centerY = 50; // Center of the viewport
    const offsetY = centerY - selectedProject.position.y;
    return `translateY(${offsetY}%)`;
  };

  return (
    <div className="w-full h-full relative overflow-hidden" ref={containerRef}>
      {/* Background grid effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Main content container with transform */}
      <div 
        className="relative w-full h-full will-change-transform"
        style={{ 
          transform: getContainerTransform(),
          transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Connections between nodes */}
        <RoadmapConnections 
          projects={projects} 
          revealedNodes={revealedNodes}
          showAll={showAll}
          isCharacterMoving={false}
        />
        
        {/* Nodes */}
        <div className="relative w-full h-full">
          {projects.map(project => (
            <React.Fragment key={project.id}>
              <RoadmapNode 
                project={project}
                onClick={handleNodeClick}
                isSelected={selectedProject?.id === project.id}
                showAll={showAll}
                isRevealed={revealedNodes.includes(project.id)}
              />
              {showAll && (
                <div 
                  className="absolute z-10 bg-gray-900 rounded-lg px-4 py-2 text-white text-sm"
                  style={{
                    left: `${project.position.x + 5}%`,
                    top: `${project.position.y}%`,
                    transform: 'translateY(-50%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {project.title}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Project details modal */}
      <ProjectDetails 
        project={selectedProject} 
        onClose={handleCloseDetails} 
      />
    </div>
  );
};

export default Roadmap;