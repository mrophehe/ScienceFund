import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProjects } from '../contexts/ProjectContext';
import { useAccount } from 'wagmi';
import { formatDate, formatCurrency } from '../utils/formatters';
import { Briefcase, Mail, MapPin, Edit, ChevronUp } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('projects');

  // Find user (in a real app this would be from a user context)
  const mockUser = projects[0]?.creator; // Just for demo
  const isOwner = mockUser?.address === address;

  if (!mockUser) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">User Not Found</h2>
          <p className="text-slate-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/explore" className="text-purple-600 hover:text-purple-700 font-medium">
            Browse projects
          </Link>
        </div>
      </div>
    );
  }

  // Get user's projects and contributions
  const userProjects = projects.filter(project => project.creator.id === mockUser.id);
  const userContributions = mockUser.contributions || [];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
            <ChevronUp className="w-4 h-4 mr-1 rotate-90" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <img 
                    src={mockUser.avatar} 
                    alt={mockUser.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
                  />
                </div>
                
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">
                    {mockUser.name}
                  </h1>
                  {mockUser.institution && (
                    <div className="flex items-center justify-center text-slate-600 mb-2">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{mockUser.institution}</span>
                    </div>
                  )}
                  <div className="text-sm text-slate-500 mb-4">
                    Researcher
                  </div>
                  
                  {isOwner && (
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center justify-center mx-auto">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Profile
                    </button>
                  )}
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 mb-2">
                        Research Fields
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {mockUser.researchFields?.map((field, index) => (
                          <span 
                            key={index}
                            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 mb-2">
                        Bio
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {mockUser.bio}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 mb-2">
                        Wallet Address
                      </h3>
                      <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-600 break-all">
                        {mockUser.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-slate-200">
                <div className="flex p-4">
                  <button
                    className={`py-2 px-4 font-medium rounded-lg mr-2 ${
                      activeTab === 'projects' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveTab('projects')}
                  >
                    Projects ({userProjects.length})
                  </button>
                  <button
                    className={`py-2 px-4 font-medium rounded-lg ${
                      activeTab === 'contributions' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveTab('contributions')}
                  >
                    Contributions ({userContributions.length})
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'projects' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">
                      Research Projects
                    </h2>
                    
                    {userProjects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userProjects.map(project => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-600 mb-4">
                          No research projects yet
                        </p>
                        {isOwner && (
                          <Link 
                            to="/create" 
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                          >
                            Start a Project
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'contributions' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">
                      Contributions
                    </h2>
                    
                    {userContributions.length > 0 ? (
                      <div className="space-y-4">
                        {userContributions.map(contribution => (
                          <div 
                            key={contribution.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-200 rounded-lg"
                          >
                            <div className="md:w-1/2 mb-4 md:mb-0">
                              <Link 
                                to={`/projects/${contribution.project.id}`}
                                className="font-medium text-lg text-slate-900 hover:text-purple-600 mb-1 block"
                              >
                                {contribution.project.title}
                              </Link>
                              <div className="flex flex-wrap items-center text-sm text-slate-500">
                                <span className="mr-3">{formatDate(contribution.timestamp)}</span>
                                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                                  {contribution.project.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="md:w-1/4 text-right">
                              <div className="font-bold text-slate-900 mb-1">
                                {formatCurrency(contribution.amount)}
                              </div>
                              {contribution.message && (
                                <div className="text-xs text-slate-500 italic">
                                  "{contribution.message}"
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-600 mb-4">
                          No contributions yet
                        </p>
                        <Link 
                          to="/explore" 
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Explore projects to support
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;