import { put, takeEvery, call, select } from 'redux-saga/effects';
import { takeScreenshot } from '../api/takeScreenshot.api';
import {
  takeScreenshotFailedAction,
  takeScreenshotLoadingAction,
  takeScreenshotSuccessAction
} from '../actions/screenshot.action';

function* takeScreenshotAsync(action) {
  yield put(takeScreenshotLoadingAction());
  const response = yield call(takeScreenshot, action.payload);
  console.log('in saga: ', response);
  if (!response) {
    yield put(takeScreenshotFailedAction());
  } else {
    yield put(takeScreenshotSuccessAction(response));
  }
}

export function* watchTakeScreenshot() {
  yield takeEvery('takeScreenshot', takeScreenshotAsync);
}




