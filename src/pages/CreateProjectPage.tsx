import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ChevronLeft, ChevronRight, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const CreateProjectPage: React.FC = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { addProject } = useProjects();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: '',
    tags: [] as string[],
    fundingGoal: 0,
    image: '',
    endDate: '',
    newTag: '',
  });
  
  const [milestones, setMilestones] = useState([
    {
      title: '',
      description: '',
      targetDate: '',
      fundingPercentage: 25,
    }
  ]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (formData.newTag.trim() !== '' && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: '',
      }));
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };
  
  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        title: '',
        description: '',
        targetDate: '',
        fundingPercentage: 25,
      }
    ]);
  };
  
  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };
  
  const handleMilestoneChange = (index: number, name: string, value: string | number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [name]: value
    };
    setMilestones(updatedMilestones);
  };
  
  const validateStep = () => {
    if (step === 1) {
      return formData.title && formData.shortDescription && formData.description && 
             formData.category && formData.fundingGoal > 0 && formData.image && formData.endDate;
    }
    
    if (step === 2) {
      const totalPercentage = milestones.reduce((sum, milestone) => sum + Number(milestone.fundingPercentage), 0);
      if (totalPercentage !== 100) {
        alert("Milestone funding percentages must add up to 100%");
        return false;
      }
      
      return milestones.every(milestone => 
        milestone.title && milestone.description && milestone.targetDate
      );
    }
    
    return true;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    // Process data and submit project
    console.log('Form submitted:', { formData, milestones });
    
    // Navigate to the created project (in a real app you'd redirect to the new project)
    navigate('/explore');
  };
  
  if (!isConnected) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Wallet Connection Required</h2>
          <p className="text-slate-600 mb-6">
            You need to connect your wallet to create a project. This ensures your research project is properly associated with your blockchain identity.
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
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <h1 className="text-2xl font-bold">Create Research Project</h1>
            <p className="text-purple-100">Share your scientific innovation with potential funders</p>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <ol className="flex items-center w-full">
                <li className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-slate-400'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 1 ? 'bg-purple-100 text-purple-600' : 'bg-slate-100'
                  }`}>
                    1
                  </span>
                  <span className="ml-2 text-sm font-medium">Project Details</span>
                </li>
                <li className="flex items-center w-full">
                  <div className={`flex-1 h-px mx-2 ${step >= 2 ? 'bg-purple-600' : 'bg-slate-200'}`}></div>
                </li>
                <li className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-slate-400'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 2 ? 'bg-purple-100 text-purple-600' : 'bg-slate-100'
                  }`}>
                    2
                  </span>
                  <span className="ml-2 text-sm font-medium">Milestones</span>
                </li>
                <li className="flex items-center w-full">
                  <div className={`flex-1 h-px mx-2 ${step >= 3 ? 'bg-purple-600' : 'bg-slate-200'}`}></div>
                </li>
                <li className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-slate-400'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 3 ? 'bg-purple-100 text-purple-600' : 'bg-slate-100'
                  }`}>
                    3
                  </span>
                  <span className="ml-2 text-sm font-medium">Review</span>
                </li>
              </ol>
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                      Project Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Enter a clear, descriptive title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-1">
                      Short Description* (100 characters max)
                    </label>
                    <input
                      type="text"
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      maxLength={100}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Brief description for project cards"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                      Full Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Provide a detailed description of your research project..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Quantum Computing">Quantum Computing</option>
                      <option value="Climate Science">Climate Science</option>
                      <option value="Neuroscience">Neuroscience</option>
                      <option value="Biotechnology">Biotechnology</option>
                      <option value="AI Research">AI Research</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Astronomy">Astronomy</option>
                      <option value="Materials Science">Materials Science</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tags
                    </label>
                    <div className="flex mb-2">
                      <input
                        type="text"
                        name="newTag"
                        value={formData.newTag}
                        onChange={handleChange}
                        className="flex-grow py-2 px-3 rounded-l-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Add relevant tags"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="bg-purple-600 text-white py-2 px-4 rounded-r-lg hover:bg-purple-700"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <div 
                          key={index} 
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-purple-700 hover:text-purple-900"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fundingGoal" className="block text-sm font-medium text-slate-700 mb-1">
                        Funding Goal (USD)*
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">$</span>
                        <input
                          type="number"
                          id="fundingGoal"
                          name="fundingGoal"
                          min="1"
                          value={formData.fundingGoal || ''}
                          onChange={handleChange}
                          className="w-full py-2 pl-8 pr-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Amount needed"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
                        Funding End Date*
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
                      Project Image URL*
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Enter URL of project image"
                      required
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Project Milestones</h3>
                      <button
                        type="button"
                        onClick={handleAddMilestone}
                        className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Milestone
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <div 
                          key={index}
                          className="p-4 border border-slate-200 rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-slate-900">Milestone {index + 1}</h4>
                            {milestones.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMilestone(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor={`milestone-title-${index}`} className="block text-sm font-medium text-slate-700 mb-1">
                                Title*
                              </label>
                              <input
                                type="text"
                                id={`milestone-title-${index}`}
                                value={milestone.title}
                                onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                                className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Milestone title"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor={`milestone-description-${index}`} className="block text-sm font-medium text-slate-700 mb-1">
                                Description*
                              </label>
                              <textarea
                                id={`milestone-description-${index}`}
                                value={milestone.description}
                                onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                rows={3}
                                className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Describe what will be accomplished"
                                required
                              ></textarea>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor={`milestone-date-${index}`} className="block text-sm font-medium text-slate-700 mb-1">
                                  Target Completion Date*
                                </label>
                                <input
                                  type="date"
                                  id={`milestone-date-${index}`}
                                  value={milestone.targetDate}
                                  onChange={(e) => handleMilestoneChange(index, 'targetDate', e.target.value)}
                                  min={new Date().toISOString().split('T')[0]}
                                  className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label htmlFor={`milestone-percentage-${index}`} className="block text-sm font-medium text-slate-700 mb-1">
                                  Funding Percentage* (total must be 100%)
                                </label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    id={`milestone-percentage-${index}`}
                                    value={milestone.fundingPercentage}
                                    onChange={(e) => handleMilestoneChange(index, 'fundingPercentage', parseInt(e.target.value))}
                                    min="1"
                                    max="100"
                                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    required
                                  />
                                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500">%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-sm text-slate-600">
                      <p>Total allocation: {milestones.reduce((sum, m) => sum + Number(m.fundingPercentage), 0)}% (must equal 100%)</p>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Review Your Project</h3>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Project Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-slate-500">Title:</span>
                        <p className="text-slate-900">{formData.title}</p>
                      </div>
                      
                      <div>
                        <span className="text-slate-500">Category:</span>
                        <p className="text-slate-900">{formData.category}</p>
                      </div>
                      
                      <div>
                        <span className="text-slate-500">Funding Goal:</span>
                        <p className="text-slate-900">${formData.fundingGoal}</p>
                      </div>
                      
                      <div>
                        <span className="text-slate-500">End Date:</span>
                        <p className="text-slate-900">{formData.endDate}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-slate-500">Short Description:</span>
                      <p className="text-slate-900">{formData.shortDescription}</p>
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-slate-500">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Milestones</h4>
                    <div className="space-y-4">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between">
                            <h5 className="font-medium text-slate-900">{milestone.title}</h5>
                            <span className="text-sm text-purple-600">{milestone.fundingPercentage}%</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{milestone.description}</p>
                          <div className="text-xs text-slate-500 mt-1">
                            Target date: {milestone.targetDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Smart Contract Terms</h4>
                    <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li>Funds will be held in escrow until milestones are verified</li>
                      <li>Each milestone must be verified through Screenpipe's tracking system</li>
                      <li>Milestone funding will be released automatically upon verification</li>
                      <li>Project must receive full funding by end date to proceed</li>
                      <li>If funding goal is not met, all contributions will be returned</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Important Note
                    </h4>
                    <p className="text-sm text-yellow-700">
                      By creating this project, you are entering into a legally binding smart contract. 
                      You will be required to complete the milestones as described and submit verification 
                      through Screenpipe to receive funding. Failure to meet milestones may result in 
                      funds being returned to contributors.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center bg-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    Create Project
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProjectPage;