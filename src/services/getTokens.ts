import { TokenDataItem } from '@/types/tokenDataItem';
import axios from 'axios';

export default async function getTokens() {
    const response = await axios.get(`/api/getTokens`);
    return response.data.data as TokenDataItem[];
}