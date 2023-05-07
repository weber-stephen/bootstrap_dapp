import type { NextApiRequest, NextApiResponse } from 'next'

import swapData from '../../data/swap.json';
import { SwapToken } from '@/types/swapTokens';

type Data = {
  data: SwapToken[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = swapData as SwapToken[];
  res.status(200).json({
    data
  });
}
