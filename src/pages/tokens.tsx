import PageHeading from '@/components/PageHeading/Index'
import TokenTable from '@/components/TokenTable/Index'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tokens</title>
      </Head>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className='mx-auto max-w-full'>
            <PageHeading />
            <TokenTable />
          </div>
        </div>
      </main>
    </>
  )
}
