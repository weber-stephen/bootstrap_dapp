/* eslint-disable react-hooks/exhaustive-deps */
import getTokens from "@/services/getTokens";
import { classNames } from "@/utils/classNames";
import { useEffect, useState } from "react"
import { ChainSelector } from "../ChainSelector/Index";
import { IoSearchCircleOutline } from "react-icons/io5";
import { formatEth } from "@/utils/chainDisplayUtils";
import { TokenDataItem } from "@/types/tokenDataItem";
import Image from "next/image";
import { formatLargeUsd } from "@/utils/currency";

export default function TokenTable() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tokens, setTokens] = useState<TokenDataItem[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenDataItem[]>([]);
  
  const loadData = async () => {
    const data = await getTokens();
    setTokens(data);
    setFilteredTokens(data);
  };

  const trendDisplay = (input:any,prepend:string = '',time: string = '1d') => {
    const d1 = input['1d'];
    const d90 = input['90d'];
    let latest = input[time];
    return (
      <span className={classNames(d1 > d90 ? 'text-green-300' : 'text-red-300')}>{latest?.length > 0 ? prepend : ''}{formatEth(latest)}</span>
    )
  };

  const onSearch = (input:string) => {
    if(input.length > 0) {
      const searchFor = input.toLowerCase();
      const result = filteredTokens.filter(x => x.name.toLowerCase().indexOf(searchFor) > -1);
      setFilteredTokens(result);
    } else {
      setFilteredTokens(tokens);
    }
  }

  useEffect(() => {
    if(!isLoaded) {
      setIsLoaded(true);
      loadData();
    }
  });

  return (
    <div className="px-4">
      <div className="mt-8 flex flex-col">

        {/* Table Controls */}
        <div className="mb-4 flex w-full">
          <ChainSelector expanded={true} />
          <div className="w-[200px] ml-4">
            <div className="w-full">
              <div className="relative rounded-md shadow-sm ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <IoSearchCircleOutline className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="text"
                  id="text"
                  onChange={e => onSearch(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-right pt-6  text-gray-400 text-sm">Last refreshed 2/5/2023</div>
        </div>

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="border border-gray-400 border-opacity-20 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="border-b border-white/10 text-sm leading-6 text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-light sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-2 text-right text-sm font-light"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-right text-sm font-light"
                    >
                      Change
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-right text-sm font-light"
                    >
                      TVL
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 pr-8 text-right text-sm font-light"
                    >
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-400 divide-opacity-10 bg-gray-900 text-md font-[300]">
                  {filteredTokens.map((token,index) => (
                    <tr key={index}>
                      <td className="py-4 whitespace-nowrap pl-4 pr-3 text-white sm:pl-6">
                        <div className="flex items-center gap-x-4">
                          <Image src={'/tokens/'+token?.logo} alt={token.name} width={60} height={60} className="h-8 w-8 rounded-full bg-gray-800" />
                          <div className="truncate leading-6 text-white">{token.name}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-white text-right">
                        {formatEth(token.metric_aggregations.price.values.latest)}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-right">{trendDisplay(token?.metric_aggregations.price.changes)}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-white text-right">{formatLargeUsd(token.metric_aggregations.tvl.values.latest)}</td>
                      <td className="whitespace-nowrap px-2 py-2 pr-8 text-white text-right">{formatLargeUsd(token.metric_aggregations.token_trading_volume.values.latest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}