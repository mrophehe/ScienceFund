import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import ProjectCard from '../components/ProjectCard';

const ExplorePage: React.FC = () => {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const categories = Array.from(new Set(projects.map(project => project.category)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedStatus('');
    setSearchTerm('');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-3xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Research Projects
          </motion.h1>
          <motion.p 
            className="text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover and support innovative scientific research from around the world
          </motion.p>
        </div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search projects, researchers..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="py-3 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="py-3 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
          
          {(selectedCategory || selectedStatus || searchTerm) && (
            <div className="flex items-center">
              <span className="mr-2 text-slate-600 text-sm">Active filters:</span>
              {selectedCategory && (
                <button
                  className="bg-purple-100 text-purple-800 text-sm py-1 px-3 rounded-full flex items-center mr-2"
                  onClick={() => setSelectedCategory('')}
                >
                  Category: {selectedCategory}
                  <X className="ml-1 w-3 h-3" />
                </button>
              )}
              {selectedStatus && (
                <button
                  className="bg-purple-100 text-purple-800 text-sm py-1 px-3 rounded-full flex items-center mr-2"
                  onClick={() => setSelectedStatus('')}
                >
                  Status: {selectedStatus}
                  <X className="ml-1 w-3 h-3" />
                </button>
              )}
              {searchTerm && (
                <button
                  className="bg-purple-100 text-purple-800 text-sm py-1 px-3 rounded-full flex items-center mr-2"
                  onClick={() => setSearchTerm('')}
                >
                  Search: {searchTerm}
                  <X className="ml-1 w-3 h-3" />
                </button>
              )}
              <button
                className="text-slate-600 text-sm hover:text-purple-600"
                onClick={resetFilters}
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="text-slate-400 mb-2">
                <Filter className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-1">No matching projects found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ExplorePage;