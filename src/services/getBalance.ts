import axios from 'axios';

export default async function getBalance(address: string) {
    const response = await axios.get(`/api/getBalance`,{params:{'address':address}});
    return response.data;
}