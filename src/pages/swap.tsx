import TokenSwap from '@/components/TokenSwap/Index'
import Head from 'next/head'

export default function Swap() {
  return (
    <>
      <Head>
        <title>Swap</title>
      </Head>
      <main>
          <div className='flex justify-center items-center h-[800px]'>
              <div className='m-auto block w-[480px]'>
                  <TokenSwap />
              </div>
          </div>
      </main>
    </>
  )
}
