import { put, takeEvery, call, select } from 'redux-saga/effects';
import { takeScreenshot } from '../api/takeScreenshot.api';
import {
  takeScreenshotFailedAction,
  takeScreenshotLoadingAction,
  takeScreenshotSuccessAction
} from '../actions/screenshot.action';

function* takeScreenshotAsync(action) {
  const { stockList, time } = action.payload;
  if (!stockList || stockList.length === 0) {
    console.log('stock is required');
    return;
  }
  yield put(takeScreenshotLoadingAction(time));
  const response = yield call(takeScreenshot, stockList);
  console.log('in saga: ', response);
  if (!response) {
    yield put(takeScreenshotFailedAction(time));
  } else {
    yield put(takeScreenshotSuccessAction({ response, time }));
  }
}

export function* watchTakeScreenshot() {
  yield takeEvery('takeScreenshot', takeScreenshotAsync);
}




