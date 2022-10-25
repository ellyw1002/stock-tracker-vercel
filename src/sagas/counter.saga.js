import { put, takeEvery, call, select } from 'redux-saga/effects';
import { fetchCount } from '../api/counter.api';
import { incrementByAmountAction, incrementAsyncPendingAction, incrementAsyncFulfilledAction } from '../actions/counter.action';
import { selectCount } from '../selectors/counter.selector';

function* incrementAsync(action) {
    yield put(incrementAsyncPendingAction());
    const response = yield call(fetchCount, action.payload);
    yield put(incrementAsyncFulfilledAction(response.data));
}

function* incrementIfOdd(action) {
    const value = yield select(selectCount);
    if (value % 2 !== 0) {
        yield put(incrementByAmountAction(action.payload));
    }
}

export function* watchIncrementAsync() {
    yield takeEvery('incrementAsync', incrementAsync);
}

export function* watchIncrementByOdd() {
    yield takeEvery('incrementIfOdd', incrementIfOdd);
}



