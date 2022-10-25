export async function searchStock(query = '') {
    if (!query) {
        return [];
    }
    const response = await fetch(`/api/searchStock?term=${query}`);
    const users = await response.json();
    return users;
}

export async function addStock(symbol = '') {
    if (!symbol) {
        return [];
    }
    const response = await fetch(`/api/getStock?symbol=${symbol}`);
    const stockInfo = await response.json();
    return stockInfo;
}