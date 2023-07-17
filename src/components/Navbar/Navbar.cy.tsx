import React from 'react'
import Navbar from './Index'
import MockRouter from '../../../cypress/utils/router'
import { WagmiConfig } from 'wagmi';
import { Wallet } from 'ethers';
import { mockWagmiClient } from '../../../cypress/utils/wagmi';

describe('<Navbar />', () => {
    const demoWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")
    const wagmiClient = mockWagmiClient(demoWallet);
    
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <MockRouter asPath="/">
                <WagmiConfig client={wagmiClient}>
                    <Navbar />
                </WagmiConfig>
            </MockRouter>
        )
    })
})