const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const INCREMENT_BY_AMOUNT = 'incrementByAmount';
const INCREMENT_ASYNC = 'incrementAsync';
const INCREMENT_ASYNC_PENDING = 'incrementAsyncPending';
const INCREMENT_ASYNC_FULFILLED = 'incrementAsyncFulfilled';
const INCREMENT_IF_ODD = 'incrementIfOdd';

export const incrementAction = () => {
    return {
        type: INCREMENT
    };
};

export const decrementAction = () => {
    return {
        type: DECREMENT
    };
};

export const incrementByAmountAction = (amount) => {
    return {
        type: INCREMENT_BY_AMOUNT,
        payload: amount
    };
};

export const incrementAsyncAction = (amount) => {
    return {
        type: INCREMENT_ASYNC,
        payload: amount
    };
};

export const incrementAsyncPendingAction = (amount) => {
    return {
        type: INCREMENT_ASYNC_PENDING
    };
};

export const incrementAsyncFulfilledAction = (amount) => {
    return {
        type: INCREMENT_ASYNC_FULFILLED,
        payload: amount
    };
};

export const incrementIfOddAction = (amount) => {
    return {
        type: INCREMENT_IF_ODD,
        payload: amount
    };
}

