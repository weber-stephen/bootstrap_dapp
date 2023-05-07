function formatAddress(address: `0x${string}` | undefined) {
    if(address) {
        return address.substring(0,4)+'...'+address.substring(address.length-4,address.length);
    }
    return '';
}
function formatTransaction(transaction: string) {
    return transaction.substring(0,24)+"...";
}
function formatEth(amount: number) {
    if(amount) {
        return amount.toString().substring(0,8);
    }
    return '';
}
function formatEthDecimals(amount: string) {
    return amount.substring(0,8);
}
export {
    formatAddress,
    formatTransaction,
    formatEth,
    formatEthDecimals
}