import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useAccount, useBalance, useEnsName, useNetwork } from 'wagmi'
import BigNumber from "bignumber.js";

import { formatAddress, formatEthDecimals } from '@/utils/chainDisplayUtils'
import { formatEth } from '@/utils/chainDisplayUtils'
import { HiArrowLeftOnRectangle, HiArrowsRightLeft, HiLifebuoy } from 'react-icons/hi2'
import getPrice from '@/services/getPrice'
import { formatUsd } from '@/utils/currency'
import { disconnect } from '@wagmi/core'

export default function ConnectedWallet() {
    const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
    const [ethInUSD, setEthInUSD] = useState<string>();

    const { address, isConnected } = useAccount();
    const { chain, chains } = useNetwork()
    const { data: ensName } = useEnsName({ address })

    const { data, isError, isLoading } = useBalance({
        address: address,
    })

    const getPriceData = async (amountStr: string) => {
        const amount = BigNumber(amountStr);
        const price = await getPrice();
        const mathResult = amount.multipliedBy(price);
        const result = formatUsd(mathResult.toNumber());
        setEthInUSD(result);
    };

    useEffect(() => {
        if(data) {
            getPriceData(data?.formatted);
        }
    },[data]);

    useEffect(() => {
        if(address) {
            setWalletAddress(address);
        }
    }, [address, setWalletAddress]);

    return (
    <Menu as="div" className="relative inline-block text-left shadow-2xl">
        <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-gray-500 bg-opacity-30 text-white pl-4 pr-3 py-2.5 text-sm font-semibold shadow-sm border-2 border-transparent hover:border-2 hover:border-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {ensName && (
                    <span>{ensName}</span>
                )}
                {!ensName && (
                    <span>{formatAddress(walletAddress)}</span>
                )}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-600 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-3">
            <div className="truncate text-sm font-medium text-white">
                <div className="flex flex-col gap-2 justify-center items-center py-6">
                    {data && (
                        <p className="text-3xl font-medium whitespace-nowrap">{formatEthDecimals(data?.formatted)} <span className='uppercase'>{data?.symbol}</span></p>
                    )}
                    {ethInUSD && (
                        <p className="font-medium text-slate-400">{ethInUSD}</p>
                    )}
                </div>
            </div>
            </div>
            <div className="py-1">
            <Menu.Item>
                {({ active }) => (
                <a
                    href="#"
                    className={classNames(
                    active ? 'bg-gray-700' : 'text-gray-400',
                    'flex px-4 py-2 text-sm transition-all hover:text-gray-200'
                    )}
                >
                    <HiArrowsRightLeft className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true" />
                    Transactions
                </a>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                <a
                    href="#"
                    className={classNames(
                        active ? 'bg-gray-700' : 'text-gray-400',
                        'flex px-4 py-2 text-sm transition-all hover:text-gray-200'
                    )}
                >
                    <HiLifebuoy className="mr-3 h-5 w-5 text-gray-400 "
                    aria-hidden="true" />
                    Support
                </a>
                )}
            </Menu.Item>
            </div>
            <div className="py-1">
                <Menu.Item>
                {({ active }) => (
                    <button
                    onClick={disconnect}
                    className={classNames(
                        active ? 'bg-gray-700' : 'text-gray-400',
                        'flex w-full px-4 py-2 text-left text-sm transition-all hover:text-gray-200'
                    )}
                    >
                    <HiArrowLeftOnRectangle className="mr-3 h-5 w-5 text-gray-400 "
                    aria-hidden="true" />
                    Disconnect
                    </button>
                )}
                </Menu.Item>
            </div>
        </Menu.Items>
        </Transition>
    </Menu>
    )
}
