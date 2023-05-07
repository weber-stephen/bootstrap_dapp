import axios from 'axios';

export default async function getPrice() {
    const response = await axios.get(`/api/getPrice`);
    const usdPrice: number = response.data?.prices.USD || 0;
    return usdPrice;
}