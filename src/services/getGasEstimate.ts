import { GasEstimateResponse } from '@/pages/api/getGasEstimate';
import axios from 'axios';

export default async function getGasEstimate(tokenAddress: `0x${string}`) {
    const response = await axios.get(`/api/getGasEstimate`,{params:{'tokenAddress': tokenAddress}});
    return response.data as GasEstimateResponse;
}