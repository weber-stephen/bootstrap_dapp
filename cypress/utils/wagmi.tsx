import { Wallet } from "ethers";
import { configureChains, createClient } from "wagmi";
import { MockConnector } from '@wagmi/core/connectors/mock';
import { InjectedConnector } from 'wagmi/dist/connectors/injected';
import { infuraProvider } from 'wagmi/dist/providers/infura';
import { mainnet } from '@wagmi/core/chains';
 import { createWalletClient } from 'viem';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const mockWagmiClient = (wallet: Wallet) => {
    const { chains, provider, webSocketProvider } = configureChains(
        [mainnet],
        [
            jsonRpcProvider({
                rpc: () => ({
                    http: "http://localhost:8545",
                    webSocket: "ws://localhost:8545"
                }),
            }),
        ],
    )
    const wagmiClient = createClient({
        autoConnect: true,
        provider,
        webSocketProvider,
        connectors: [
            new MockConnector({
                chains,
                options: {
                    signer: wallet,
                    chainId: 31337,
                },
            }),
        ],
    })
    return wagmiClient;
}