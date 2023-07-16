import {Wallet} from "ethers";
import {configureChains, createClient, mainnet, WagmiConfig} from "wagmi";
import {MockConnector} from "@wagmi/core/connectors/mock";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {Story} from "@storybook/react";
import { wagmiClient } from '../src/pages/_app';
import React from "react";

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

export const WagmiDecorator = (Story: Story) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <Story/>
        </WagmiConfig>
    );
};

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiClient = (wallet: Wallet) => createClient({
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
});

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
export const MockWagmiDecorator = (wallet: Wallet) => (Story: Story) => {
    return (
        <WagmiConfig client={mockWagmiClient(wallet)}>
            <Story/>
        </WagmiConfig>
    );
};