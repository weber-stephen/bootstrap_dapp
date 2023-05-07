import type { NextApiRequest, NextApiResponse } from 'next'

import tokenData from '../../data/tokens.json';
import { TokenDataItem } from '@/types/tokenDataItem';

type Data = {
  data: TokenDataItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = tokenData.data as TokenDataItem[];

  res.status(200).json({
    data
  });
}
