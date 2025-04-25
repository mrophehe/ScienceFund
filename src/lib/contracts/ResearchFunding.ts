// Mock smart contract ABI - In production this would be generated from Solidity contracts
export const ResearchFundingABI = [
  {
    inputs: [{ name: "projectId", type: "uint256" }],
    name: "fundProject",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "fundingGoal", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
    name: "createProject",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "projectId", type: "uint256" },
      { name: "milestoneId", type: "uint256" },
    ],
    name: "verifyMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;