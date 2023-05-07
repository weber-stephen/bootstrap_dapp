import Blob from '@/components/Blob/Index';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="relative isolate overflow-hidden ">
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold leading-6 text-cyan-400 ring-1 ring-inset ring-indigo-500/20">
                  Whats new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>Just shipped v1.0</span>
                  <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              DeFi That Truly Defies
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Your Gateway to Decentralized Finance
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/swap"
                className="rounded-md bg-cyan-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </Link>
              <Link href="#" className="text-md font-semibold leading-6 text-gray-400 hover:text-white transition-all">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex w-[300px] h-[300px] md:h-[400px] md:w-full lg:w-full">
            <Blob />
          </div>
        </div>
      </div>
    </main>
  )
}
