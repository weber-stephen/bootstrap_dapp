import Image from 'next/image';
import './TokenSelect.module.scss';
import { HiChevronDown } from "react-icons/hi2";
import classNames from 'classnames';
import { SwapToken } from '@/types/swapTokens';
import { Button } from '@/components/Button/Index';

interface TokenSelectProps {
  token: SwapToken | undefined;
  onSelect: () => void
}

export default function TokenSelect({token, onSelect}: TokenSelectProps) {
  return (
    <div className='absolute top-[16px] right-[10px]'>
      <Button
        onClick={onSelect}
      >
        <>
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
            <span className='text-lg'>Select Token</span>
          )}
        </>
      </Button>
    </div>
  )
}
