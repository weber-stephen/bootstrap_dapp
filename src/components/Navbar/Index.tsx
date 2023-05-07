import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { WalletConnect } from '../WalletConnect/Index'
import classNames from 'classnames'
import Logo from '../Logo/Index'
import Link from 'next/link'
import { ChainSelector } from '../ChainSelector/Index'

const navigation = [
    { name: 'Swap', href: '/swap' },
    { name: 'Tokens', href: '/tokens' },
    { name: 'Blog', href: '/blog' },
    { name: 'Support', href: '/support' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })

  return (
    <header className="fixed top-0 z-10 w-full">
      <nav className={classNames(isScrolled ? 'bg-gray-900' : 'bg-transparent', "transition-all mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8")} aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">PhotonEx</span>
            <Logo />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:space-x-8 lg:py-2">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        router.pathname === item.href
                        ? 'text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-md font-medium transition-all'
                    )}
                    aria-current={router.pathname === item.href ? 'page' : undefined}
                >
                    {item.name}
                </a>
            ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className='mr-2'><ChainSelector expanded={false} /></div>
          <WalletConnect />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src="/vercel.svg"
                width={60}
                height={60}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root text-center w-full">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            router.pathname === item.href
                            ? 'bg-gray-400 text-gray-800'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                        '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-400 hover:bg-gray-50'
                        )}
                        aria-current={router.pathname === item.href ? 'page' : undefined}
                    >
                        {item.name}
                    </a>
                ))}
              </div>
              <div className="py-6">
                <ChainSelector />
              </div>
              <div className="py-6">
                <WalletConnect />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
