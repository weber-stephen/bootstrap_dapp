import { IoWalletSharp } from "react-icons/io5";

import './TokenInput.module.scss';
import { formatEthDecimals } from "@/utils/chainDisplayUtils";
import { useAccount, useBalance } from "wagmi";
import Balance from "@/components/Balance/Index";
import { useState } from "react";

interface TokenInputProps {
  selectedTokenAddress: `0x${string}` | undefined;
}

export default function TokenInput({selectedTokenAddress}: TokenInputProps) {
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('0.0');
  const { address, isConnected } = useAccount();

  const onBalanceLoaded = (amount: string) => {
    if(amount) {
      setMaxAmount(amount);
    }
  }

  const setMax = () => {
    setTokenAmount(maxAmount);
  };

  return (
    <div className='token-input-component relative'>
      <label htmlFor="tokenInput" className="sr-only">
        0
      </label>
      <input
        value={tokenAmount}
        onChange={e => setTokenAmount(e.target.value)}
        type="number"
        pattern="[0-9]*"
        className="pb-12 block text-4xl w-full rounded-md border-0 py-3.5 text-white bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
        placeholder="0"
      />
      <div className='balance absolute bottom-4 left-4'>
        <div className='flex justify-between align-middle'>
          <div className='text-sm text-gray-400'>
            {selectedTokenAddress && address && (
              <>
                <IoWalletSharp className="inline mr-2" size={16} />Balance: <Balance balanceLoaded={onBalanceLoaded} selectedTokenAddress={selectedTokenAddress} address={address} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className='balance absolute bottom-4 right-4'>
        <div className='flex ml-2'>
          <button onClick={setMax} className='rounded-full text-xs px-2 py-0 text-gray-300 bg-gray-600 hover:bg-gray-800 hover:text-white'>MAX</button>
        </div>
      </div>
    </div>
  )
}
  