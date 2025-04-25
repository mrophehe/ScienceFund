import { Project, User, Contribution, Milestone, Update } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Dr. Jane Smith',
    bio: 'Quantum physicist researching quantum computing applications in medicine',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=800',
    institution: 'MIT',
    researchFields: ['Quantum Physics', 'Computational Medicine'],
    projects: [],
    contributions: [],
  },
  {
    id: '2',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    name: 'Prof. Alex Johnson',
    bio: 'Climate scientist specializing in atmospheric carbon capture technologies',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
    institution: 'Stanford University',
    researchFields: ['Climate Science', 'Carbon Capture'],
    projects: [],
    contributions: [],
  },
  {
    id: '3',
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
    name: 'Dr. Maria Rodriguez',
    bio: 'Neuroscientist exploring brain-computer interfaces for treating neurological disorders',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    institution: 'Johns Hopkins University',
    researchFields: ['Neuroscience', 'Brain-Computer Interfaces'],
    projects: [],
    contributions: [],
  },
];

// Mock Milestones
const createMilestones = (projectId: string): Milestone[] => [
  {
    id: `${projectId}-m1`,
    title: 'Initial Research and Literature Review',
    description: 'Complete comprehensive literature review and establish research methodology',
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    fundingPercentage: 20,
  },
  {
    id: `${projectId}-m2`,
    title: 'Data Collection Phase',
    description: 'Collection of preliminary data and calibration of equipment',
    targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    fundingPercentage: 30,
  },
  {
    id: `${projectId}-m3`,
    title: 'Analysis and Preliminary Results',
    description: 'Data analysis and presentation of preliminary findings',
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    fundingPercentage: 30,
  },
  {
    id: `${projectId}-m4`,
    title: 'Final Report and Publication',
    description: 'Peer-reviewed publication and final report delivery',
    targetDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    fundingPercentage: 20,
  },
];

// Mock Updates
const createUpdates = (projectId: string, author: User): Update[] => [
  {
    id: `${projectId}-u1`,
    title: 'Project Kickoff',
    content: 'We have officially begun our research project. Equipment has been set up and the team is ready to start the initial phase.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author,
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Quantum Computing for Drug Discovery',
    description: `This project aims to leverage quantum computing algorithms to accelerate drug discovery for treatment-resistant diseases. By utilizing quantum superposition and entanglement, we can simulate molecular interactions at an unprecedented scale and speed.

Our approach combines quantum machine learning with traditional drug discovery pipelines to identify novel therapeutic compounds with a higher probability of clinical success. This could dramatically reduce the time and cost of bringing new treatments to market, particularly for complex diseases that have resisted conventional approaches.

The research will be conducted in three phases:
1. Development of quantum algorithms specifically optimized for molecular modeling
2. Validation against known drug-target interactions
3. Application to novel targets associated with treatment-resistant conditions

Funding will support quantum computing resources, specialized equipment, and a multidisciplinary team of quantum physicists, computational chemists, and pharmaceutical scientists.`,
    shortDescription: 'Using quantum computing to accelerate drug discovery for treatment-resistant diseases',
    creator: mockUsers[0],
    category: 'Quantum Computing',
    tags: ['Quantum Computing', 'Drug Discovery', 'Healthcare', 'AI'],
    fundingGoal: 150000,
    currentFunding: 85000,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
    milestones: createMilestones('1'),
    updates: createUpdates('1', mockUsers[0]),
    contributors: [],
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: '2',
    title: 'Atmospheric Carbon Capture Technology',
    description: `This project focuses on developing a novel atmospheric carbon capture system that can be deployed at scale with minimal energy requirements. Our innovative approach uses advanced materials science to create highly efficient carbon-binding substrates that can operate in ambient conditions.

The technology we're developing has the potential to remove carbon dioxide from the atmosphere at a rate 10x more efficient than current solutions, while requiring significantly less energy input. This breakthrough could provide a critical tool in addressing climate change by offering a viable path to negative emissions.

Our research plan includes:
- Synthesis and optimization of new carbon-binding materials
- Development of a modular capture system design
- Field testing in various environmental conditions
- Lifecycle and economic analysis for scaling

The interdisciplinary team brings together experts in materials science, environmental engineering, and climate modeling to ensure a comprehensive approach to this global challenge.`,
    shortDescription: 'Developing efficient atmospheric carbon capture technology to combat climate change',
    creator: mockUsers[1],
    category: 'Climate Science',
    tags: ['Climate Change', 'Carbon Capture', 'Sustainability', 'Materials Science'],
    fundingGoal: 200000,
    currentFunding: 75000,
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000).toISOString(),
    milestones: createMilestones('2'),
    updates: createUpdates('2', mockUsers[1]),
    contributors: [],
    image: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: '3',
    title: 'Neural Interface for Paralysis Treatment',
    description: `This research project aims to develop a next-generation neural interface that can restore motor function in individuals with paralysis. Our approach integrates advanced brain-computer interface technology with non-invasive stimulation techniques to create a comprehensive system for rehabilitation and assistive control.

The neural interface we're developing uses a novel combination of EEG-based signal detection, AI-powered intention recognition, and targeted muscular stimulation to create a closed-loop system that can adapt to individual users' needs and capabilities. This personalized approach could dramatically improve outcomes for patients with spinal cord injuries or neuromuscular disorders.

Key research components include:
- Development of high-resolution, non-invasive neural signal acquisition
- Creation of adaptive algorithms for accurate intention detection
- Design of precise, comfortable stimulation arrays
- Integration and testing with volunteer participants

Our interdisciplinary team combines expertise in neuroscience, biomedical engineering, machine learning, and clinical rehabilitation to address this complex challenge from multiple perspectives.`,
    shortDescription: 'Creating neural interfaces to restore movement function for individuals with paralysis',
    creator: mockUsers[2],
    category: 'Neuroscience',
    tags: ['Neuroscience', 'Brain-Computer Interface', 'Paralysis', 'Rehabilitation'],
    fundingGoal: 250000,
    currentFunding: 120000,
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000).toISOString(),
    milestones: createMilestones('3'),
    updates: createUpdates('3', mockUsers[2]),
    contributors: [],
    image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
];

// Add circular references
mockProjects.forEach(project => {
  const creator = mockUsers.find(user => user.id === project.creator.id);
  if (creator) {
    creator.projects.push(project);
  }
});

// Mock Contributions
export const mockContributions: Contribution[] = [
  {
    id: '1',
    contributor: mockUsers[1],
    project: mockProjects[0],
    amount: 10000,
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    message: 'Excited to support this groundbreaking research!',
  },
  {
    id: '2',
    contributor: mockUsers[2],
    project: mockProjects[0],
    amount: 5000,
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    message: 'This could revolutionize medicine. Happy to contribute.',
  },
  {
    id: '3',
    contributor: mockUsers[0],
    project: mockProjects[1],
    amount: 15000,
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    transactionHash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
    message: 'Climate change demands innovative solutions like this!',
  },
];

// Add contributions to users and projects
mockContributions.forEach(contribution => {
  const contributor = mockUsers.find(user => user.id === contribution.contributor.id);
  const project = mockProjects.find(p => p.id === contribution.project.id);
  
  if (contributor && !contributor.contributions.find(c => c.id === contribution.id)) {
    contributor.contributions.push(contribution);
  }
  
  if (project && !project.contributors.find(c => c.id === contribution.id)) {
    project.contributors.push(contribution);
  }
});