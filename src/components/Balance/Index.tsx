import { formatEthDecimals } from "@/utils/chainDisplayUtils";
import { useEffect } from "react";
import { useBalance, useNetwork } from "wagmi";

interface TokenInputProps {
    address: `0x${string}` | undefined;
    selectedTokenAddress: `0x${string}` | undefined;
    balanceLoaded?: (amount: string) => void;
}

export default function Balance({address, selectedTokenAddress, balanceLoaded}: TokenInputProps) {

  const { chain } = useNetwork()
  const { data, isError, isLoading } = useBalance({
      address: address,
      // chainId: chain?.id ? chain?.id : undefined, //Uncomment if you have a provider API key that supports the chain options - read more here https://docs.ethers.org/v5/api-keys/
      token: selectedTokenAddress != "0x0000000000000000000000000000000000000000" ? selectedTokenAddress : undefined,
  })

  useEffect(() => {
    if(data) {
      if(balanceLoaded) {
        balanceLoaded(data?.formatted);
      }
    }
  },[balanceLoaded, data]);

  return (
    <>
    {data?.formatted && (
        <span>{formatEthDecimals(data?.formatted)}</span>
    )}
    </>
  )
}
  