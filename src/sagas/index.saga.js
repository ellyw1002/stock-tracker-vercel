import { watchIncrementAsync, watchIncrementByOdd } from './counter.saga';
import { watchTakeScreenshot } from './screenshot.saga';
import { all } from 'redux-saga/effects';
// import { watchAddStock } from './addStock.saga';

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchIncrementByOdd(),
    watchTakeScreenshot()
  ]);
}