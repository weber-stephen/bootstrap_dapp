import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';

type Data = {
  prices?: object;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

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
}
