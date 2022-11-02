const TAKE_SCREENSHOT = 'takeScreenshot';
const TAKE_SCREENSHOT_FAILED = 'takeScreenshotFailed';
const TAKE_SCREENSHOT_SUCCESS = 'takeScreenshotSuccess';
const TAKE_SCREENSHOT_LOADING = 'takeScreenshotLoading';

export const takeScreenshotAction = (stockList) => {
  return {
    type: TAKE_SCREENSHOT,
    payload: stockList
  };
};

export const takeScreenshotFailedAction = () => {
  return {
    type: TAKE_SCREENSHOT_FAILED
  };
};

export const takeScreenshotLoadingAction = () => {
  return {
    type: TAKE_SCREENSHOT_LOADING
  };
};

export const takeScreenshotSuccessAction = (response) => {
  return {
    type: TAKE_SCREENSHOT_SUCCESS,
    payload: response
  };
};


