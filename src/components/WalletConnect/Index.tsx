import { Menu } from '@headlessui/react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import ConnectedWallet from './ConnectedWallet/ConnectedWallet';
import { useEffect, useState } from 'react';

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
      if(address) {
          setWalletAddress(address);
      } else {
        setWalletAddress(undefined);
      }
  }, [address, setWalletAddress,isConnected]);
 
  return (
    <div>
      {walletAddress && (
        <ConnectedWallet />
      )}
      {!walletAddress && (
        <button className="rounded-md bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() => connect()}>
          Connect Wallet
        </button>
      )}
    </div>
  )
};

export {
  WalletConnect
};
