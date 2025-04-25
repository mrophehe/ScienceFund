import { parseEther, formatEther } from 'viem';
import { useContractWrite, useContractRead, useWaitForTransaction, useChainId } from 'wagmi';
import { ResearchFundingABI } from './contracts/ResearchFunding';

// Mock contract address - In production this would be the deployed contract address
const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

// Mock blockchain interactions with proper types
export const useCreateProject = () => {
  const chainId = useChainId();
  const { data, write, isLoading: isWriteLoading, isError } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ResearchFundingABI,
    functionName: 'createProject',
    chainId,
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash, // Only enable the hook when we have a hash
  });

  const createProject = async (
    title: string,
    description: string,
    fundingGoal: number,
    deadline: Date
  ) => {
    try {
      const deadlineTimestamp = Math.floor(deadline.getTime() / 1000);
      const fundingGoalWei = parseEther(fundingGoal.toString());

      await write({
        args: [title, description, fundingGoalWei, BigInt(deadlineTimestamp)],
      });

      return true;
    } catch (error) {
      console.error('Error creating project:', error);
      return false;
    }
  };

  return {
    createProject,
    isLoading: isWriteLoading || isWaiting,
    isError,
    isSuccess,
  };
};

export const useFundProject = () => {
  const chainId = useChainId();
  const { data, write, isLoading: isWriteLoading, isError } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ResearchFundingABI,
    functionName: 'fundProject',
    chainId,
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash, // Only enable the hook when we have a hash
  });

  const fundProject = async (projectId: string, amount: number) => {
    try {
      const valueWei = parseEther(amount.toString());

      await write({
        args: [BigInt(projectId)],
        value: valueWei,
      });

      return true;
    } catch (error) {
      console.error('Error funding project:', error);
      return false;
    }
  };

  return {
    fundProject,
    isLoading: isWriteLoading || isWaiting,
    isError,
    isSuccess,
  };
};

export const useVerifyMilestone = () => {
  const chainId = useChainId();
  const { data, write, isLoading: isWriteLoading, isError } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ResearchFundingABI,
    functionName: 'verifyMilestone',
    chainId,
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash, // Only enable the hook when we have a hash
  });

  const verifyMilestone = async (projectId: string, milestoneId: string) => {
    try {
      await write({
        args: [BigInt(projectId), BigInt(milestoneId)],
      });

      return true;
    } catch (error) {
      console.error('Error verifying milestone:', error);
      return false;
    }
  };

  return {
    verifyMilestone,
    isLoading: isWriteLoading || isWaiting,
    isError,
    isSuccess,
  };
};