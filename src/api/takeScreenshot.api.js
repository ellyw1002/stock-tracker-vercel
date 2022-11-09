function takeScreenshotWithRetry(url, retries = 3) {

  return fetch(url).then(async (response) => {
    if (!response.ok) {
      // retry or throw error
      if (retries > 0) {
        console.log('Retry: ' + retries);
        // setTimeout(() => {
        //   return takeScreenshotWithRetry(url, retries - 1);
        // }, 1000);
        return await takeScreenshotWithRetry(url, retries - 1);
      } else {
        throw new Error(response.status);
      }
    }
    return response;
  }).catch(error => console.log(error.message));
}

export async function takeScreenshot(stockList = []) {
  let stockScreenshots = [];
  for (const item of stockList) {
    try {
      console.log('before screenshot: ', item.symbol);
      const response = await takeScreenshotWithRetry(`api/takeScreenshot?term=${item.symbol}`, 3);
      console.log('response: ', response);
      stockScreenshots[item.symbol] = await response.json();
    } catch (error) {
      console.log(`failed after 3 retries for stock ${item.symbol}`);
      break;
    }
  };
  console.log('returning from api: ', stockScreenshots);
  return stockScreenshots;
}