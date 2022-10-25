const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const INCREMENT_BY_AMOUNT = 'incrementByAmount';
const INCREMENT_ASYNC_PENDING = 'incrementAsyncPending';
const INCREMENT_ASYNC_FULFILLED = 'incrementAsyncFulfilled';

const initialState = {
    value: 0,
    status: 'idle',
};

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1
            };
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1
            };
        case INCREMENT_BY_AMOUNT:
            return {
                ...state,
                value: state.value + action.payload
            };
        case INCREMENT_ASYNC_PENDING:
            return {
                ...state,
                status: 'loading'
            };
        case INCREMENT_ASYNC_FULFILLED:
            return {
                ...state,
                status: 'idle',
                value: state.value + action.payload
            };
        default:
            return state;
    }
}