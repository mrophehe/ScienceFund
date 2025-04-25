import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Project } from '../types';
import { mockProjects } from '../data/mockData';
import { useAccount } from 'wagmi';
import { useCreateProject, useFundProject, useVerifyMilestone } from '../lib/blockchain';

interface ProjectContextType {
  projects: Project[];
  featuredProjects: Project[];
  trendingProjects: Project[];
  getProjectById: (id: string) => Project | undefined;
  addProject: (project: Project) => Promise<boolean>;
  updateProject: (project: Project) => void;
  fundProject: (projectId: string, amount: number) => Promise<boolean>;
  verifyMilestone: (projectId: string, milestoneId: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  // Blockchain hooks
  const { createProject, isLoading: isCreating } = useCreateProject();
  const { fundProject: fundProjectContract, isLoading: isFunding } = useFundProject();
  const { verifyMilestone: verifyMilestoneContract, isLoading: isVerifying } = useVerifyMilestone();

  const featuredProjects = projects
    .filter(project => project.status === 'active')
    .sort((a, b) => b.currentFunding - a.currentFunding)
    .slice(0, 3);

  const trendingProjects = projects
    .filter(project => project.status === 'active')
    .sort((a, b) => {
      const aProgress = a.currentFunding / a.fundingGoal;
      const bProgress = b.currentFunding / b.fundingGoal;
      return bProgress - aProgress;
    })
    .slice(0, 6);

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const addProject = async (project: Project) => {
    try {
      // Call blockchain
      const success = await createProject(
        project.title,
        project.description,
        project.fundingGoal,
        new Date(project.endDate)
      );

      if (success) {
        // Update local state
        setProjects(prev => [...prev, project]);
        return true;
      }
      
      setError('Failed to create project on blockchain');
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    }
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(
      projects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const fundProject = async (projectId: string, amount: number) => {
    try {
      // Call blockchain
      const success = await fundProjectContract(projectId, amount);

      if (success) {
        // Update local state
        const project = getProjectById(projectId);
        if (project) {
          const updatedProject = {
            ...project,
            currentFunding: project.currentFunding + amount,
            contributors: [
              ...project.contributors,
              {
                id: Date.now().toString(),
                contributor: { id: address || '', address: address || '' } as any,
                project,
                amount,
                timestamp: new Date().toISOString(),
                transactionHash: '0x' + Math.random().toString(16).slice(2),
              },
            ],
          };
          updateProject(updatedProject);
        }
        return true;
      }

      setError('Failed to fund project on blockchain');
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    }
  };

  const verifyMilestone = async (projectId: string, milestoneId: string) => {
    try {
      // Call blockchain
      const success = await verifyMilestoneContract(projectId, milestoneId);

      if (success) {
        // Update local state
        const project = getProjectById(projectId);
        if (project) {
          const updatedProject = {
            ...project,
            milestones: project.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, status: 'completed' as const }
                : milestone
            ),
          };
          updateProject(updatedProject);
        }
        return true;
      }

      setError('Failed to verify milestone on blockchain');
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        featuredProjects,
        trendingProjects,
        getProjectById,
        addProject,
        updateProject,
        fundProject,
        verifyMilestone,
        isLoading: isCreating || isFunding || isVerifying,
        error,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};