import { useEffect, useState } from "react";
import { HiArrowDown } from "react-icons/hi2";
import { FaGasPump } from "react-icons/fa";

import './TokenSwap.module.scss';
import TokenInput from "./TokenInput/Index";
import TokenSelect from "./TokenSelect/Index";
import TokenModal from "../TokenModal/TokenModal";
import getSwap from "@/services/getSwap";
import { SwapToken } from "@/types/swapTokens";
import Loading from "../Loading/Index";
import getGasEstimate from "@/services/getGasEstimate";
import { useAccount } from "wagmi";
import { formatUsd } from "@/utils/currency";

export default function TokenSwap() {
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const [isLoadingPrices, setLoadingPrices] = useState<boolean>();
  const [gasPrice, setGasPrice] = useState<number>();
  const [isTokenModalOpen, setTokenModalOpen] = useState<boolean | undefined>(false);
  const [swapTokens, setSwapTokens] = useState<SwapToken[]>([]);
  const [tokenFrom, setTokenFrom] = useState<SwapToken>();
  const [tokenTo, setTokenTo] = useState<SwapToken>();
  const [isSwapEnabled, setSwapEnabled] = useState<Boolean>();
  const [isTokenFromToChange, setTokenFromToChange] = useState<Boolean>();

  useEffect(() => {
      if(address) {
          setWalletAddress(address);
      } else {
          
      }
  }, [address, setWalletAddress]);

  const setTokenChange = (input: Boolean) => {
    openTokenModal();
    setTokenFromToChange(input);
  };

  const openTokenModal = () => {
    if(isTokenModalOpen) {
      setTokenModalOpen(false);
    } else {
      setTokenModalOpen(true);
    }
  };

  const loadGasPrices = async (token:SwapToken) => {
    const {gasPrice} = await getGasEstimate(token?.address as `0x${string}`);
    return gasPrice;
  };

  const onSelectToken = async(token:SwapToken) => {
    if(isTokenFromToChange) {
      setTokenFrom(token);
      if(tokenTo) {
        setSwapEnabled(true);
      }
    } else {
      setTokenTo(token);
      if(tokenFrom) {
        setSwapEnabled(true);
      }
      setLoadingPrices(true);
      const price = await loadGasPrices(token);
      if(price) {
        setGasPrice(price);
        setLoadingPrices(false);
      }
    }
    setTokenModalOpen(false);
  };

  const getSwapData = async () => {
      const {data} = await getSwap();
      setSwapTokens(data as SwapToken[]);
      setTokenFrom(data[0]);
  };

  useEffect(() => {
      if(swapTokens.length === 0) {
          getSwapData();
      }
  },[swapTokens])

  return (
    <div className="token-swap-wrapper rounded-lg bg-gray-800 px-4 py-5 sm:px-6 w-full">
      <h3 className="text-xl font-semibold leading-6 text-white mb-4">Swap</h3>
      <div>
          <div className="token-swap-input-wrapper relative mb-2">
              <TokenInput selectedTokenAddress={tokenFrom?.address} />
              {tokenFrom && (
                <TokenSelect token={tokenFrom} onSelect={() => {setTokenChange(true)}}/>
              )}
          </div>
          <div className="relative switch-btn z-10 m-auto mt-[-18px] flex align-middle justify-center mb-2 m">
              <button className="bg-gray-600 hover:bg-gray-800 rounded-md p-2"><HiArrowDown className="text-gray-300" /></button>
          </div>
      </div>
      <div className="token-swap-input-wrapper relative -mt-4">
          <TokenInput selectedTokenAddress={tokenTo?.address} />
          <TokenSelect token={tokenTo} onSelect={() => {setTokenChange(false)}}/>
      </div>
      <div className="mt-3 ml-2 flex flex-row">
        
        {isLoadingPrices && (
          <div className="flex">
            <div className="inline">
              <Loading />
            </div>
            <div className="text-gray-400 inline">Getting best prices</div>
          </div>
        )}

        {!isLoadingPrices && gasPrice && (
          <div className="mt-1 flex flex-row">
            <FaGasPump className="fill-gray-400 mt-1" />
            <div className="ml-4 text-gray-400">{formatUsd(gasPrice/100)}</div>
          </div>
        )}
      </div>
      <button
        type="button"
        disabled={!isSwapEnabled && !walletAddress}
        className="w-full mt-4 rounded-full bg-cyan-600 px-4 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-cyan-900 disabled:text-cyan-950"
      >
        {isSwapEnabled && (
          <span>Swap</span>
        )}
        {!isSwapEnabled && (
          <span>Select Token</span>
        )}
      </button>
      {isTokenModalOpen && (
        <TokenModal tokens={swapTokens} open={isTokenModalOpen} setOpen={openTokenModal} setSelect={onSelectToken} />
      )}
    </div>
  )
}
  