export async function searchStock(query = '') {
    if (!query) {
        return [];
    }
    const response = await fetch(`/api/searchStock?term=${query}`);
    const responseJson = await response.json();
    return responseJson;
}
export async function getStockList() {

    const response = await fetch(`/api/getStockList`);
    if (!response.ok) return;
    const responseJson = await response.json();
    return responseJson;
}

export async function getStockScreenshot(symbol, time) {

    const response = await fetch(`/api/getStockScreenshot?symbol=${symbol}&time=${time}`);
    if (!response.ok) return;
    const responseJson = await response.json();
    return responseJson;
}