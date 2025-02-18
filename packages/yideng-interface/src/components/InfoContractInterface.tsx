import { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';
import { hooks } from '@connections/metaMask';
import InfoContractABI from '@abis/InfoContract.json';
import { BigNumber } from '@ethersproject/bignumber';
import { InfoContract, InfoContract__factory } from '@/types/ethers-contracts';

// 合约地址
const CONTRACT_ADDRESS = InfoContractABI.networks['5777'].address;

const InfoContractInterface = () => {
  const { useProvider, useAccounts } = hooks;
  const accounts = useAccounts();
  const account = accounts?.[0];
  const provider = useProvider();

  const [contract, setContract] = useState<InfoContract | null>(null);
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [contractInfo, setContractInfo] = useState({ name: '', age: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (provider && account) {
      const signer = provider.getSigner();
      // 直接省去了as 操作
      // const contractInstance = new Contract(
      //   CONTRACT_ADDRESS,
      //   InfoContractABI.abi,
      //   signer
      // );
      const contractInstance = InfoContract__factory.connect(
        CONTRACT_ADDRESS,
        signer!
      );
      setContract(contractInstance);

      contractInstance.on('Instructor', (name: string, age: BigNumber) => {
        console.log('Instructor event:', name, age.toString());
        handleGetInfo();
      });

      return () => {
        contractInstance.removeAllListeners();
      };
    }
  }, [provider, account]);

  const handleSetInfo = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      setError('');
      const tx = await contract.setInfo(inputName, inputAge);
      await tx.wait();
      setInputName('');
      setInputAge('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Failed to set info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInfo = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      setError('');
      const [name, age] = await contract.getInfo();
      setContractInfo({ name, age: age.toString() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Failed to get info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSayHi = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      setError('');
      const response = await contract.sayHi();
      console.log('SayHi response:', response);
      alert(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Failed to say hi:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Info Contract Interface
      </h1>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Connected Account:</p>
        <p className="font-mono text-gray-800 break-all">{account}</p>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Age"
          value={inputAge}
          onChange={(e) => setInputAge(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSetInfo}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Set Info
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <button
          onClick={handleGetInfo}
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get Info
        </button>
        {contractInfo.name && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-800">
              Name: <span className="font-semibold">{contractInfo.name}</span>
            </p>
            <p className="text-gray-800">
              Age: <span className="font-semibold">{contractInfo.age}</span>
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleSayHi}
        disabled={loading}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        Say Hi
      </button>

      {error && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {loading && (
        <div className="p-4 bg-blue-50 rounded-md">
          <p className="text-blue-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default InfoContractInterface;
