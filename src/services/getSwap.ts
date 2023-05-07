import axios from 'axios';

export default async function getSwap() {
    const response = await axios.get(`/api/getSwap`);
    return response.data;
}