export async function takeScreenshot(stockSymbol = '') {
  if (!stockSymbol) {
    throw 'stock is required';
  }
  const response = await fetch(`api/takeScreenshot?term=${stockSymbol}`);
  return response;
}