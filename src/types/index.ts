export interface User {
  id: string;
  address: string;
  name: string;
  bio: string;
  avatar: string;
  institution?: string;
  researchFields?: string[];
  projects: Project[];
  contributions: Contribution[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  creator: User;
  category: string;
  tags: string[];
  fundingGoal: number;
  currentFunding: number;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
  updates: Update[];
  contributors: Contribution[];
  image: string;
  status: 'active' | 'completed' | 'expired';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'pending' | 'active' | 'completed' | 'verified';
  verificationData?: string;
  fundingPercentage: number;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  author: User;
  attachments?: string[];
}

export interface Contribution {
  id: string;
  contributor: User;
  project: Project;
  amount: number;
  timestamp: string;
  transactionHash: string;
  message?: string;
}