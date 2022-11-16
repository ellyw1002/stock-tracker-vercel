const TAKE_SCREENSHOT = 'takeScreenshot';
const TAKE_SCREENSHOT_FAILED = 'takeScreenshotFailed';
const TAKE_SCREENSHOT_SUCCESS = 'takeScreenshotSuccess';
const TAKE_SCREENSHOT_LOADING = 'takeScreenshotLoading';

export const takeScreenshotAction = (stockInfo) => {
  return {
    type: TAKE_SCREENSHOT,
    payload: stockInfo
  };
};

export const takeScreenshotFailedAction = (time) => {
  return {
    type: TAKE_SCREENSHOT_FAILED,
    payload: time
  };
};

export const takeScreenshotLoadingAction = (time) => {
  return {
    type: TAKE_SCREENSHOT_LOADING,
    payload: time
  };
};

export const takeScreenshotSuccessAction = (time) => {
  return {
    type: TAKE_SCREENSHOT_SUCCESS,
    payload: time
  };
};


