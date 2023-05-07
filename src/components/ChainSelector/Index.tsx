import { Menu, Transition } from '@headlessui/react'
import { useAccount, useConnect, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useNetwork } from 'wagmi'

import { Fragment, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import { chainData, Chain } from '@/chains';
import { HiCheck } from 'react-icons/hi2';

interface ChainSelectorProps {
    expanded: boolean;
}

function ChainSelector({expanded}:ChainSelectorProps) {  
    const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
    const [selectedChain, setSelectedChain] = useState<Chain>();

    const { address, isConnected } = useAccount()
    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

    useEffect(() => {
        if(address) {
            setWalletAddress(address);
        }
    }, [address, setWalletAddress]);

    useEffect(() => {
        if(chain?.id) {
            const currentChain = chainData.find(o => o.id === chain.id);
            if(currentChain) {
                setSelectedChain(currentChain);
            }
        } else {
            setSelectedChain(chainData[0]);
        }
    },[chain])

    const selectChain = (newChain: Chain) => {
        setSelectedChain(newChain);
        if(newChain) {
            switchNetwork?.(newChain?.id);
        }
    }
 
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left rounded-md shadow-2xl">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-gray-500 bg-opacity-30 text-white pl-2 pr-3 py-1.5 text-sm font-bold border-2 border-transparent hover:border-2 hover:border-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {selectedChain && (
                            <Image className="rounded-full mr-1 h-7 w-7 text-gray-400" src={selectedChain.logo} width={60} height={60} alt={selectedChain.name} />
                        )}
                        {expanded && selectedChain && (
                            <span className='flex py-1 text-sm'>{selectedChain.name}</span>
                        )}
                        <ChevronDownIcon className="-mr-1 mt-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute right-0 p-2 z-10 mt-2 origin-top-right rounded-md bg-gray-900 border border-gray-400 border-opacity-20 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {chainData.map((chain) => (
                        <div className="py-1" key={chain.id}>
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    onClick={() => selectChain(chain)}
                                    className={classNames(
                                    active ? 'bg-gray-700' : 'text-gray-400',
                                    'cursor-pointer flex px-2 py-2 pr-8 text-sm transition-all hover:text-gray-200 rounded-md'
                                    )}
                                >
                                    <Image className="rounded-full mr-3 h-5 w-5 text-gray-400" src={chain.logo} width={40} height={40} alt={chain.name} />
                                    {chain.name}
                                    {chain.id === selectedChain?.id && (
                                        <div className='flex-end'>
                                            <HiCheck className="mt-1 w-8 fill-gray-400" aria-hidden="true" />
                                        </div>
                                    )}
                                </a>
                                )}
                            </Menu.Item>
                        </div>
                    ))}
                </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
};

export {
  ChainSelector
};
