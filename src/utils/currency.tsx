function formatUsd(input: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(input);
};
function formatLargeUsd(input: number) {
    let formatter = Intl.NumberFormat('en', { notation: 'compact',style: 'currency',
    currency: 'USD' });
    return formatter.format(input);
}
export {
    formatUsd,
    formatLargeUsd
}