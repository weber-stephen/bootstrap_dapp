import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';
import { ErrorResponse, getExceptionMessage, getExceptionStack, getExceptionStatus } from '@/utils/errors';

type DataResponse = {
  prices?: object;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse | ErrorResponse>
) {

  try {
    const response = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP");
  
    if(response) {
      const prices = response.data;
      res.status(200).json({
        prices
      })
    } else {
      res.status(404).json({
        error: "Provide chain address"
      })
    }
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
