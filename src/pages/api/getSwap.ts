import type { NextApiRequest, NextApiResponse } from 'next'

import swapData from '../../data/swap.json';
import { SwapToken } from '@/types/swapTokens';
import { ErrorResponse, getExceptionMessage, getExceptionStack, getExceptionStatus } from '@/utils/errors';

type DataResponse = {
  data: SwapToken[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse | ErrorResponse>
) {
  try {
    const data = swapData as SwapToken[];
    res.status(200).json({
      data
    });
  } catch(error) {

    const status = getExceptionStatus(error);
    const message = getExceptionMessage(error);
    const stack = getExceptionStack(error);

    if (stack) {
      // eslint-disable-next-line no-console
      console.debug(stack);
    }

    return res.status(status).json({
      error: message
    });
  }
}
