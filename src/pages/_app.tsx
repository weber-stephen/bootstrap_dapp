import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createClient, mainnet } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { InjectedConnector } from 'wagmi/connectors/injected';

import Navbar from '@/components/Navbar/Index'
import '@/styles/globals.scss'
import Footer from '@/components/Footer/Index';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {

  const { chains, provider } = configureChains(
    [mainnet],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY || "" })],
  )
  const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
  })
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className='min-h-full'>
      <WagmiConfig client={client}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </WagmiConfig>
    </div>
    </>
  )
}
