import { put, takeEvery, call, select } from 'redux-saga/effects';
import { insertStock, removeStock } from '../api/stockList.api';
import { addStockFulfilledAction, addStockFailedAction, removeStockFulfilledAction, removeStockFailedAction } from '../actions/stockList.action';

function* addStockAsync(action) {
  const response = yield call(insertStock, action.payload);
  if (!response || !response.ok) {
    yield put(addStockFailedAction());
  } else {
    yield put(addStockFulfilledAction());
  }
}

export function* watchAddStock() {
  yield takeEvery('addStock', addStockAsync);
}

function* removeStockAsync(action) {
  const response = yield call(removeStock, action.payload);
  if (!response || !response.ok) {
    yield put(removeStockFailedAction());
  } else {
    yield put(removeStockFulfilledAction());
  }
}

export function* watchRemoveStock() {
  yield takeEvery('removeStock', removeStockAsync);
}




