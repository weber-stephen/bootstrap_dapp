import type { NextApiRequest, NextApiResponse } from 'next'

import { ethers } from 'ethers';

type Data = {
  address?: string,
  balance?: string,
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.query.address) {
    let provider = ethers.getDefaultProvider();
    const address = req.query.address as string;

    let balance = await provider.getBalance(address);
  
    const balanceInEther = ethers.utils.formatEther(balance);
  
    res.status(200).json({
      address,
      balance: balanceInEther
    })
  } else {
    res.status(404).json({
      error: "Provide wallet address"
    })
  }
}
