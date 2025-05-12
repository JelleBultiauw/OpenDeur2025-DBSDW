import React from 'react';
import { Project } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import HandControl from './HandControl';

interface ProjectDetailsProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="fixed left-24 top-24 z-50"
        style={{
          width: '400px',
        }}
      >
        <div 
          className="bg-gray-900 rounded-lg overflow-hidden"
          style={{
            border: `2px solid ${project.color}50`,
            boxShadow: `0 0 30px ${project.color}30`,
          }}
        >
          <div 
            className="p-6 relative"
            style={{
              borderBottom: `1px solid ${project.color}30`,
            }}
          >
            <h2 
              className="text-3xl font-bold mb-2"
              style={{ color: project.color }}
            >
              {project.title}
            </h2>
            <p className="text-gray-400 text-lg">{project.date}</p>
            <button 
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <X size={24} color={project.color} />
            </button>
          </div>
          
          <div className="p-6">
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{project.description}</p>
            
            <div className="mb-6">
              <h3 className="text-gray-400 text-lg mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}50`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Add HandControl component for Mind Hand Control project */}
            {project.id === "p1" && (
              <div className="absolute left-[420px] top-0">
                <HandControl projectColor={project.color} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;