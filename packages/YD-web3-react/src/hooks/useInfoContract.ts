// hooks/useInfoContract.ts
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from 'wagmi';
import InfoContract from '@abis/InfoContract.json';

// 从 ABI 文件中获取合约地址
const CONTRACT_ADDRESS = InfoContract.networks[5777].address as `0x${string}`;

export const useInfoContract = () => {
  const { address: account } = useAccount();
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
  } = useWriteContract();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // 获取信息
  const {
    data: info,
    isLoading: isLoadingInfo,
    refetch: refetchInfo,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: InfoContract.abi,
    functionName: 'getInfo',
  });

  // 获取 Hi
  const { data: hiMessage } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: InfoContract.abi,
    functionName: 'sayHi',
  });

  const setInfo = (name: string, age: number) => {
    if (!CONTRACT_ADDRESS) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: InfoContract.abi,
      functionName: 'setInfo',
      args: [name, BigInt(age)],
    });
  };

  return {
    info,
    isLoadingInfo,
    setInfo,
    isSettingInfo: isWritePending || isConfirming,
    hiMessage,
    isConnected: !!account,
    account,
    refetchInfo,
    hash,
    isConfirmed,
    contractAddress: CONTRACT_ADDRESS,
  };
};
