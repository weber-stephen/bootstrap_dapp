import type { NextApiRequest, NextApiResponse } from 'next'

import { ethers } from 'ethers';
import { ErrorResponse, getExceptionMessage, getExceptionStack, getExceptionStatus } from '@/utils/errors';

type DataResponse = {
  address?: string,
  balance?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse | ErrorResponse>
) {

  if(req.query.address) {
    try {
      let provider = ethers.getDefaultProvider();
      const address = req.query.address as string;
  
      let balance = await provider.getBalance(address);
    
      const balanceInEther = ethers.utils.formatEther(balance);
    
      res.status(200).json({
        address,
        balance: balanceInEther
      })
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
  } else {
    res.status(404).json({
      error: "Provide wallet address"
    })
  }
}
