import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';
// import { ethers } from 'ethers';

export type GasEstimateResponse = {
    gasPrice?: number;
    error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GasEstimateResponse>
) {

  if(req.query.tokenAddress) {

    // If you want to get a gas estimate for a specific token then you would load it here
    // const erc20Abi = [ /* ... */ ];
    // const address = req.query.tokenAddress as string;
    // const provider = ethers.getDefaultProvider();
    // const erc20 = new ethers.Contract(address, abi, provider);

    // const recipient = req.query.walletAddress;
    // const estimation = await erc20.estimateGas.transfer(recipient, 100);

    try {
        // For demo purposes we are going to use an API
        const response = await axios.get('https://ethgasstation.info/api/ethgasAPI.json')
        if(response.data) {
            const data = response.data;
    
            const {average} = data;
    
            res.status(200).json({
              gasPrice: average,
            })
        }
    } catch(e) {
        // Responding back with a fake number for demo purposes if the API is down or rate limited
        res.status(200).json({
          gasPrice: 143,
        })
    }
  } else {
    res.status(404).json({
      error: "Provide token address and wallet address"
    })
  }
}
