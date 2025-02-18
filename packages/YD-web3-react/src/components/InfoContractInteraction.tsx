// components/InfoContractInteraction.tsx
import React, { useState, useEffect } from 'react';
import { useInfoContract } from '../hooks/useInfoContract';

const InfoContractInteraction = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  type InfoType = [string, number];
  const {
    info,
    isLoadingInfo,
    setInfo,
    isSettingInfo,
    hiMessage,
    isConnected,
    hash,
    isConfirmed,
    refetchInfo,
    contractAddress,
  } = useInfoContract();

  // 当交易确认后刷新数据
  useEffect(() => {
    if (isConfirmed) {
      refetchInfo();
    }
  }, [isConfirmed, refetchInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age) {
      setInfo(name, Number(age));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">合约地址: {contractAddress}</div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">合约信息</h2>
        {!isConnected ? (
          <p className="text-red-500">请先连接钱包</p>
        ) : isLoadingInfo ? (
          <p>加载中...</p>
        ) : (
          <div className="space-y-2">
            <p>当前名字: {(info as InfoType)?.[0] || '未设置'}</p>
            <p>当前年龄: {(info as InfoType)?.[1]?.toString() || '未设置'}</p>
            <p>Hi 消息: {hiMessage as string}</p>
          </div>
        )}
      </div>

      {isConnected && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              名字:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isSettingInfo}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              年龄:
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isSettingInfo}
            />
          </div>

          <button
            type="submit"
            disabled={isSettingInfo || !name || !age}
            className={`
              w-full px-4 py-2 rounded-lg text-white
              ${
                isSettingInfo
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {isSettingInfo ? '处理中...' : '提交'}
          </button>
        </form>
      )}

      {hash && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          <p>{isConfirmed ? '交易已确认!' : '交易已提交!'}</p>
          <a
            href={`https://etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            查看交易
          </a>
        </div>
      )}
    </div>
  );
};

export default InfoContractInteraction;
