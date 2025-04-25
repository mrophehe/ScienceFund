import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useProjects } from '../contexts/ProjectContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight, CircleDollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { isConnected } = useAccount();
  const { projects } = useProjects();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data for the dashboard (in a real app, this would come from the user context)
  const mockUser = projects[0]?.creator; // Just for demo
  const userProjects = projects.filter(project => project.creator.id === mockUser?.id);
  const userContributions = mockUser?.contributions || [];
  
  // Calculate some stats
  const totalFunded = userContributions.reduce((sum, contribution) => sum + contribution.amount, 0);
  const projectsCreated = userProjects.length;
  const projectsFunded = userContributions.length;
  
  // Prepare data for charts
  const contributionData = userContributions.map(contribution => ({
    name: contribution.project.title.slice(0, 15) + (contribution.project.title.length > 15 ? '...' : ''),
    amount: contribution.amount
  }));
  
  const projectFundingData = userProjects.map(project => ({
    name: project.title.slice(0, 15) + (project.title.length > 15 ? '...' : ''),
    raised: project.currentFunding,
    goal: project.fundingGoal
  }));
  
  // For the pie chart
  const statusData = [
    { name: 'Active', value: userProjects.filter(p => p.status === 'active').length },
    { name: 'Completed', value: userProjects.filter(p => p.status === 'completed').length },
    { name: 'Expired', value: userProjects.filter(p => p.status === 'expired').length }
  ].filter(item => item.value > 0);
  
  const COLORS = ['#8B5CF6', '#10B981', '#F97316'];
  
  if (!isConnected) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Wallet Connection Required</h2>
          <p className="text-slate-600 mb-6">
            You need to connect your wallet to access your dashboard. This ensures your data is securely associated with your blockchain identity.
          </p>
          <button className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
            <p className="text-slate-600">Manage your research projects and contributions</p>
          </div>
          
          <Link
            to="/create"
            className="mt-4 md:mt-0 inline-flex items-center bg-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
          >
            New Project
            <ChevronRight className="ml-1 w-5 h-5" />
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-purple-100 p-4 rounded-full mr-4">
              <CircleDollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Total Funded</p>
              <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalFunded)}</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-green-100 p-4 rounded-full mr-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Projects Created</p>
              <h3 className="text-2xl font-bold text-slate-900">{projectsCreated}</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-amber-100 p-4 rounded-full mr-4">
              <CheckCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Projects Supported</p>
              <h3 className="text-2xl font-bold text-slate-900">{projectsFunded}</h3>
            </div>
          </motion.div>
        </div>
        
        <div className="flex mb-8 border-b border-slate-200">
          <button
            className={`pb-3 mr-6 font-medium ${
              activeTab === 'overview' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-3 mr-6 font-medium ${
              activeTab === 'myProjects' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setActiveTab('myProjects')}
          >
            My Projects
          </button>
          <button
            className={`pb-3 font-medium ${
              activeTab === 'contributions' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setActiveTab('contributions')}
          >
            My Contributions
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Funding Status</h3>
              {projectFundingData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectFundingData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar name="Raised" dataKey="raised" fill="#8B5CF6" />
                      <Bar name="Goal" dataKey="goal" fill="#E5E7EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-slate-500 mb-4">You haven't created any projects yet</p>
                  <Link
                    to="/create"
                    className="inline-flex items-center text-purple-600 font-medium"
                  >
                    Create your first project
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </Link>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Contributions</h3>
              {contributionData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={contributionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar name="Amount" dataKey="amount" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-slate-500 mb-4">You haven't contributed to any projects yet</p>
                  <Link
                    to="/explore"
                    className="inline-flex items-center text-purple-600 font-medium"
                  >
                    Explore projects
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </Link>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Milestones</h3>
              {userProjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Milestone</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Funding %</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {userProjects.flatMap(project => 
                        project.milestones
                          .filter(milestone => milestone.status !== 'completed')
                          .sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())
                          .slice(0, 5)
                          .map(milestone => (
                            <tr key={milestone.id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Link to={`/projects/${project.id}`} className="text-purple-600 hover:text-purple-700 font-medium">
                                  {project.title.length > 30 ? `${project.title.slice(0, 30)}...` : project.title}
                                </Link>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                {milestone.title}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                                {formatDate(milestone.targetDate)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  milestone.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {milestone.status === 'active' ? 'In Progress' : 'Pending'}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                                {milestone.fundingPercentage}%
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">No upcoming milestones</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
        
        {activeTab === 'myProjects' && (
          <div>
            {userProjects.length > 0 ? (
              <div className="space-y-6">
                {userProjects.map(project => {
                  const progress = (project.currentFunding / project.fundingGoal) * 100;
                  const activeMillstone = project.milestones.find(m => m.status === 'active');
                  
                  return (
                    <motion.div 
                      key={project.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <div className="h-48 md:h-full relative">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover" 
                            />
                            <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                              project.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : project.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 md:w-3/4">
                          <Link to={`/projects/${project.id}`}>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-purple-600 transition-colors">
                              {project.title}
                            </h3>
                          </Link>
                          
                          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                            {project.shortDescription}
                          </p>
                          
                          <div className="mb-4">
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
                          
                          <div className="flex flex-wrap gap-y-4 justify-between items-center">
                            <div className="flex items-center text-sm text-slate-500">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>Ends on {formatDate(project.endDate)}</span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Link 
                                to={`/projects/${project.id}`}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded font-medium text-sm transition-colors"
                              >
                                View
                              </Link>
                              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium text-sm transition-colors">
                                Update
                              </button>
                            </div>
                          </div>
                          
                          {activeMillstone && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                              <div className="flex justify-between items-center text-sm">
                                <div>
                                  <span className="text-slate-500 mr-2">Current milestone:</span>
                                  <span className="font-medium text-slate-700">{activeMillstone.title}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-slate-500 mr-2">Due:</span>
                                  <span className="font-medium text-slate-700">{formatDate(activeMillstone.targetDate)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                className="text-center py-12 bg-white rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-slate-600 mb-4">
                  You haven't created any research projects yet
                </p>
                <Link 
                  to="/create" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                  Start a Project
                </Link>
              </motion.div>
            )}
          </div>
        )}
        
        {activeTab === 'contributions' && (
          <div>
            {userContributions.length > 0 ? (
              <div className="space-y-6">
                {userContributions.map(contribution => (
                  <motion.div 
                    key={contribution.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/4">
                        <div className="h-48 md:h-full relative">
                          <img 
                            src={contribution.project.image} 
                            alt={contribution.project.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                      
                      <div className="p-6 md:w-3/4">
                        <Link to={`/projects/${contribution.project.id}`}>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-purple-600 transition-colors">
                            {contribution.project.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center mb-4">
                          <img 
                            src={contribution.project.creator.avatar} 
                            alt={contribution.project.creator.name}
                            className="w-8 h-8 rounded-full mr-2 object-cover" 
                          />
                          <span className="text-sm text-slate-700">
                            By {contribution.project.creator.name}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-y-4 justify-between items-center">
                          <div>
                            <div className="text-lg font-bold text-slate-900 mb-1">
                              {formatCurrency(contribution.amount)}
                            </div>
                            <div className="text-sm text-slate-500">
                              Contributed on {formatDate(contribution.timestamp)}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${
                              contribution.project.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : contribution.project.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {contribution.project.status.charAt(0).toUpperCase() + contribution.project.status.slice(1)}
                            </span>
                            
                            <Link 
                              to={`/projects/${contribution.project.id}`}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded font-medium text-sm transition-colors"
                            >
                              View Project
                            </Link>
                          </div>
                        </div>
                        
                        {contribution.message && (
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-sm text-slate-600 italic">
                              "{contribution.message}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-12 bg-white rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-slate-600 mb-4">
                  You haven't contributed to any research projects yet
                </p>
                <Link 
                  to="/explore" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                  Explore Projects
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;