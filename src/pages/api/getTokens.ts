import type { NextApiRequest, NextApiResponse } from 'next'

import tokenData from '../../data/tokens.json';
import { TokenDataItem } from '@/types/tokenDataItem';
import { ErrorResponse, getExceptionMessage, getExceptionStack, getExceptionStatus } from '@/utils/errors';

type DataResponse = {
  data: TokenDataItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse | ErrorResponse>
) {
  try {
    const data = tokenData.data as TokenDataItem[];
  
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
