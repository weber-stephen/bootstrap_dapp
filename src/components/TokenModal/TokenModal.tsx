import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { IoSearchOutline } from 'react-icons/io5';
import TokenTag from '../TokenTag/TokenTag';
import Image from 'next/image';
import { SwapToken } from '@/types/swapTokens';

interface TokenModalProps {
    tokens: SwapToken[] | undefined;
    open: boolean | undefined;
    setOpen: () => void;
    setSelect: (token: SwapToken) => void;
}

export default function TokenModal({tokens, open, setOpen, setSelect}: TokenModalProps) {
    const [fiilteredData, setFilteredData] = useState<SwapToken[]>([]);

    const onSearchFilter = (e:any) => {
        if(tokens) {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = tokens.filter((o:SwapToken) => {
                return o.slug.toLowerCase().indexOf(searchTerm) > -1 || o.name.toLowerCase().indexOf(searchTerm) > -1;
            });
            setFilteredData(filtered);
        }
    }

    const onTokenSelect = (token: SwapToken) => {
        setSelect(token);
    }

    useEffect(() => {
        if(tokens) {
            setFilteredData(tokens);
        }
    },[tokens])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md p-1  text-gray-300 hover:text-gray-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={setOpen}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="text-left pl-4">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-200">
                      Tokens
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <div className="relative mt-2 rounded-md shadow-sm mx-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                            <IoSearchOutline className="h-5 w-5 text-gray-200" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            className="block w-full text-2xl text-white rounded-md border-0 py-2.5 pl-8 bg-gray-900 ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            onChange={onSearchFilter}
                            />
                    </div>
                    {tokens && (
                        <div className='flex flex-wrap gap-2 my-6 mx-4'>
                            {tokens.map((token:SwapToken, index) =>
                                <div key={index} onClick={() => {onTokenSelect(token)}}>
                                    <TokenTag  slug={token.slug} logo={token.logo} />
                                </div>
                            )}
                        </div>
                    )}
                    <div className='bg-gray-400 h-[2px] opacity-25'/>
                    <ul role="list" className="divide-y divide-white/5 overflow-scroll max-h-[200px] ml-4 min-h-[300px]">
                        {fiilteredData.map((item, index) => (
                            <li key={index} className="py-4 cursor-pointer" onClick={() => {onTokenSelect(item)}}>
                                <div className="flex items-center gap-x-3">
                                    <Image src={item.logo} alt={item.slug} width={30} height={30} className="h-6 w-6 flex-none rounded-full bg-gray-800" />
                                    <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">{item.slug}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
