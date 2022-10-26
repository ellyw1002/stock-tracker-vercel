const TAKE_SCREENSHOT = 'addStock';

export const takeScreenshotAction = (stockSymbol) => {
  return {
    type: TAKE_SCREENSHOT,
    payload: stockSymbol,
  };
};

