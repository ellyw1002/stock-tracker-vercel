export async function takeScreenshot(stockList = []) {
  let stockScreenshots = [];
  if (!stockList || stockList.length === 0) {
    throw 'stock is required';
  }
  for (let i = 0; i < stockList.length; i++) {
    try {
      console.log('before screenshot: ', stockList[i].symbol);
      const response = await fetch(`api/takeScreenshot?term=${stockList[i].symbol}`);
      stockScreenshots[i] = await response.json();
      // console.log('stockScreenshot: ', stockScreenshots[i]);
    } catch (err) {
      if (err.errorMessage === "Task timed out after 10.00 seconds") {
        console.log('Trying again due to timeout for stock ', stockList[i]);
      }
      throw err;
    }
  }
  console.log('returning from api: ', JSON.stringify(stockScreenshots));
  return stockScreenshots;
}