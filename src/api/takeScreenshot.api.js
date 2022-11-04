export async function takeScreenshot(stockList = []) {
  let stockScreenshots = [];
  if (!stockList || stockList.length === 0) {
    throw 'stock is required';
  }
  for (const item of stockList) {
    let retries = 3;
    while (retries > 0) {
      try {
        console.log('before screenshot: ', item.symbol);
        const response = await fetch(`api/takeScreenshot?term=${item.symbol}`);
        stockScreenshots[item.symbol] = await response.json();
        break;
        // console.log('stockScreenshot: ', stockScreenshots[i]);
      } catch (err) {
        console.log('# retries: ', retries);
        retries--;
      }
    }
  };
  console.log('returning from api: ', stockScreenshots);
  return stockScreenshots;
}