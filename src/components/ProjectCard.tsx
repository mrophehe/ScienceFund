import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { formatDate, formatCurrency } from '../utils/formatters';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const progress = (project.currentFunding / project.fundingGoal) * 100;
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <Link to={`/projects/${project.id}`}>
        <div className="h-48 overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {project.category}
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/projects/${project.id}`} className="block mb-2">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 hover:text-purple-700 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <Link to={`/profile/${project.creator.id}`} className="flex items-center mb-4">
          <img 
            src={project.creator.avatar} 
            alt={project.creator.name} 
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <span className="text-sm text-slate-700 font-medium">
            {project.creator.name}
          </span>
        </Link>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-900">
              {formatCurrency(project.currentFunding)}
            </span>
            <span className="text-slate-600">
              {Math.round(progress)}% of {formatCurrency(project.fundingGoal)}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            {project.contributors.length} contributor{project.contributors.length !== 1 ? 's' : ''}
          </span>
          <span>
            Ends {formatDate(project.endDate)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;