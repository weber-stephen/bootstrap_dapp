import Image from 'next/image';
import './TokenSelect.module.scss';
import { HiChevronDown } from "react-icons/hi2";
import classNames from 'classnames';

interface TokenSelectProps {
  token: SwapToken | undefined;
  onSelect: () => void
}

export default function TokenSelect({token, onSelect}: TokenSelectProps) {
  return (
    <div className='absolute top-[16px] right-[10px]'>
      <button
        onClick={onSelect}
        type="button"
        className={classNames(
          token ? "token-select-btn rounded-full bg-gray-600 pl-1 pr-2 py-1 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600": "bg-cyan-500 text-white px-4 py-1 text-lg rounded-full"
        )}
      >
        {token && (
          <span className='flex align-middle justify-between'>
            <div className='flex'>
                <Image className='inline mr-2 rounded-full' alt={token.slug} width={30} height={30} src={token.logo} />
                <span className='text-lg mr-2 inline'>{token.slug}</span>
            </div>
            <HiChevronDown className='inline mt-2' />
          </span>
        )}
        {!token && (
          <span>Select Token</span>
        )}
      </button>
    </div>
  )
}
