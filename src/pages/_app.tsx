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
      <title>Bootstrap dApp</title>
      <meta name="description" content="An open-source Next.js dApp to help you get started with your next web3 project." />

      <meta property="og:url" content="https://bootstrap-dapp.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Bootstrap dApp" />
      <meta property="og:description" content="An open-source Next.js dApp to help you get started with your next web3 project." />
      <meta property="og:image" content="https://bootstrap-dapp.s3.us-west-1.amazonaws.com/opengraph.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="bootstrap-dapp.vercel.app" />
      <meta property="twitter:url" content="https://bootstrap-dapp.vercel.app/" />
      <meta name="twitter:title" content="Bootstrap dApp" />
      <meta name="twitter:description" content="An open-source Next.js dApp to help you get started with your next web3 project." />
      <meta name="twitter:image" content="https://bootstrap-dapp.s3.us-west-1.amazonaws.com/opengraph.png" />
        
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
