import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProjects } from '../contexts/ProjectContext';
import { formatDate, formatCurrency, formatDateFromNow } from '../utils/formatters';
import { useAccount } from 'wagmi';
import { Check, Clock, AlertTriangle, ChevronDown, ChevronUp, ExternalLink, Calendar, User, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById } = useProjects();
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('overview');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Project Not Found</h2>
          <p className="text-slate-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/explore" className="text-purple-600 hover:text-purple-700 font-medium">
            Browse other projects
          </Link>
        </div>
      </div>
    );
  }

  const progress = (project.currentFunding / project.fundingGoal) * 100;
  const daysLeft = Math.max(0, Math.floor((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  
  const toggleMilestone = (id: string) => {
    if (expandedMilestone === id) {
      setExpandedMilestone(null);
    } else {
      setExpandedMilestone(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the funding submission
    console.log('Funding amount:', amount);
    console.log('Message:', message);
    // Reset form
    setAmount('');
    setMessage('');
  };

  // Prepare data for charts
  const pieData = [
    { name: 'Funded', value: project.currentFunding },
    { name: 'Remaining', value: Math.max(0, project.fundingGoal - project.currentFunding) }
  ];
  
  const COLORS = ['#8B5CF6', '#E5E7EB'];

  const contributionsData = project.contributors.map((contribution, index) => ({
    name: `Contribution ${index + 1}`,
    value: contribution.amount,
    date: new Date(contribution.timestamp).toLocaleDateString()
  }));

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/explore" className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
            <ChevronUp className="w-4 h-4 mr-1 rotate-90" />
            Back to Explore
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover object-center"
              />
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : project.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {project.title}
                </h1>
                
                <div className="flex items-center mb-6">
                  <Link to={`/profile/${project.creator.id}`} className="flex items-center">
                    <img 
                      src={project.creator.avatar} 
                      alt={project.creator.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover" 
                    />
                    <div>
                      <span className="font-medium text-slate-900 block">
                        {project.creator.name}
                      </span>
                      <span className="text-sm text-slate-500">
                        {project.creator.institution}
                      </span>
                    </div>
                  </Link>
                </div>
                
                <div className="border-b border-slate-200 pb-6 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900">
                      {formatCurrency(project.currentFunding)}
                    </span>
                    <span className="text-slate-600">
                      of {formatCurrency(project.fundingGoal)} goal
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="block text-2xl font-bold text-slate-900">
                        {project.contributors.length}
                      </span>
                      <span className="text-xs text-slate-500">
                        Contributors
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-slate-900">
                        {daysLeft}
                      </span>
                      <span className="text-xs text-slate-500">
                        Days Left
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-slate-900">
                        {Math.round(progress)}%
                      </span>
                      <span className="text-xs text-slate-500">
                        Funded
                      </span>
                    </div>
                  </div>
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
                      activeTab === 'milestones' 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab('milestones')}
                  >
                    Milestones
                  </button>
                  <button
                    className={`pb-3 mr-6 font-medium ${
                      activeTab === 'updates' 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab('updates')}
                  >
                    Updates
                  </button>
                  <button
                    className={`pb-3 font-medium ${
                      activeTab === 'contributors' 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab('contributors')}
                  >
                    Contributors
                  </button>
                </div>
                
                {activeTab === 'overview' && (
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line text-slate-700">
                      {project.description}
                    </p>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        Research Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'milestones' && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Research Milestones
                    </h3>
                    <div className="space-y-4">
                      {project.milestones.map((milestone) => (
                        <div 
                          key={milestone.id}
                          className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                          <div 
                            className="p-4 bg-white flex justify-between items-center cursor-pointer"
                            onClick={() => toggleMilestone(milestone.id)}
                          >
                            <div className="flex items-center">
                              <div className={`p-2 rounded-full mr-3 ${
                                milestone.status === 'completed' 
                                  ? 'bg-green-100 text-green-600' 
                                  : milestone.status === 'active'
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {milestone.status === 'completed' ? (
                                  <Check className="w-5 h-5" />
                                ) : milestone.status === 'active' ? (
                                  <Clock className="w-5 h-5" />
                                ) : (
                                  <AlertTriangle className="w-5 h-5" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900">
                                  {milestone.title}
                                </h4>
                                <div className="flex items-center text-xs text-slate-500">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Target: {formatDate(milestone.targetDate)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-slate-700 mr-2">
                                {milestone.fundingPercentage}%
                              </span>
                              {expandedMilestone === milestone.id ? (
                                <ChevronUp className="w-5 h-5 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                          </div>
                          
                          {expandedMilestone === milestone.id && (
                            <div className="p-4 bg-slate-50 border-t border-slate-200">
                              <p className="text-slate-700 mb-3">
                                {milestone.description}
                              </p>
                              <div className="text-xs text-slate-500">
                                Status: <span className="font-medium capitalize">{milestone.status}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'updates' && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Project Updates
                    </h3>
                    {project.updates.length > 0 ? (
                      <div className="space-y-6">
                        {project.updates.map((update) => (
                          <div key={update.id} className="border-b border-slate-200 pb-6">
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {update.title}
                            </h4>
                            <div className="flex items-center text-sm text-slate-500 mb-3">
                              <User className="w-4 h-4 mr-1" />
                              <span className="mr-3">{update.author.name}</span>
                              <span>{formatDateFromNow(update.date)}</span>
                            </div>
                            <p className="text-slate-700 whitespace-pre-line">
                              {update.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-600">No updates have been posted yet.</p>
                    )}
                  </div>
                )}
                
                {activeTab === 'contributors' && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Project Contributors
                    </h3>
                    {project.contributors.length > 0 ? (
                      <div className="space-y-4">
                        {project.contributors.map((contribution) => (
                          <div key={contribution.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                            <div className="flex items-center">
                              <img 
                                src={contribution.contributor.avatar} 
                                alt={contribution.contributor.name}
                                className="w-10 h-10 rounded-full mr-3 object-cover" 
                              />
                              <div>
                                <Link to={`/profile/${contribution.contributor.id}`} className="font-medium text-slate-900 hover:text-purple-600">
                                  {contribution.contributor.name}
                                </Link>
                                <div className="text-sm text-slate-500">
                                  {formatDate(contribution.timestamp)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-slate-900">
                                {formatCurrency(contribution.amount)}
                              </div>
                              {contribution.message && (
                                <div className="flex items-center text-xs text-slate-500">
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  With message
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-600">No contributions yet. Be the first to support this project!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-24">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Support This Project
              </h3>
              
              {project.status === 'active' ? (
                isConnected ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                        Contribution Amount (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">$</span>
                        <input
                          type="number"
                          id="amount"
                          min="1"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full py-3 pl-8 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full py-3 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Why are you supporting this project?"
                        rows={3}
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      Fund This Project
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <p className="text-slate-600 mb-4">
                      Connect your wallet to support this project
                    </p>
                    <button className="w-full bg-purple-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
                      Connect Wallet
                    </button>
                  </div>
                )
              ) : (
                <div className="text-center py-4">
                  <p className="text-slate-600 mb-2">
                    This project is no longer accepting contributions
                  </p>
                  <Link to="/explore" className="text-purple-600 hover:text-purple-700 font-medium">
                    Explore other projects
                  </Link>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Funding Progress
              </h3>
              
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                  <span className="text-slate-600">Funded ({Math.round(progress)}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-slate-200 rounded-full mr-2"></div>
                  <span className="text-slate-600">Remaining ({Math.round(100 - progress)}%)</span>
                </div>
              </div>
            </div>
            
            {contributionsData.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Contribution History
                </h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={contributionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="value" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;