const ADD_STOCK = 'addStock';
const REMOVE_STOCK = 'removeStock';
const TAKE_SCREENSHOT = 'takeScreenshot';
const TAKE_SCREENSHOT_FAILED = 'takeScreenshotFailed';
const TAKE_SCREENSHOT_SUCCESS = 'takeScreenshotSuccess';
const TAKE_SCREENSHOT_LOADING = 'takeScreenshotLoading';

const NOT_STARTED_STATE = 'notStarted';
const LOADING_STATE = 'loading';
const DONE_STATE = 'done';
const FAILED_STATE = 'failed';

const initialState = {
    stockList: [],
    morningScreenshotState: NOT_STARTED_STATE,
    afternoonScreenshotState: NOT_STARTED_STATE,
    eveningScreenshotState: NOT_STARTED_STATE,
};

export default function stock(state = initialState, action) {
    switch (action.type) {
        case ADD_STOCK:
            const newObject = {
                symbol: action.payload,
                morningScreenshot: '-',
                afternoonScreenshot: '-',
                eveningScreenshot: '-'
            };
            return {
                ...state,
                stockList: [...state.stockList, newObject],
                status: 'success'
            };
        case REMOVE_STOCK:
            return {
                ...state,
                stockList: [
                    ...state.stockList.slice(0, action.payload),
                    ...state.stockList.slice(action.payload + 1)
                ]
            };
        case TAKE_SCREENSHOT_SUCCESS:
            const { response, time } = action.payload;
            if (time === 'morning') {
                return {
                    ...state,
                    stockList: state.stockList.map((stockObject) =>
                        response[stockObject.symbol] ?
                            { ...stockObject, morningScreenshot: response[stockObject.symbol] } : stockObject),
                    morningScreenshotState: DONE_STATE
                };
            }
            else if (time === 'afternoon') {
                return {
                    ...state,
                    stockList: state.stockList.map((stockObject) =>
                        response[stockObject.symbol] ?
                            { ...stockObject, afternoonScreenshot: response[stockObject.symbol] } : stockObject),
                    afternoonScreenshotState: DONE_STATE
                };
            }
            else if (time === 'evening') {
                return {
                    ...state,
                    stockList: state.stockList.map((stockObject) =>
                        response[stockObject.symbol] ?
                            { ...stockObject, eveningScreenshot: response[stockObject.symbol] } : stockObject),
                    eveningScreenshotState: DONE_STATE
                };
            }
        case TAKE_SCREENSHOT_FAILED:
            if (action.payload === 'morning') {
                return {
                    ...state,
                    morningScreenshotState: FAILED_STATE
                };
            }
            else if (action.payload === 'afternoon') {
                return {
                    ...state,
                    afternoonScreenshotState: FAILED_STATE
                };
            }
            else if (action.payload === 'evening') {
                return {
                    ...state,
                    eveningScreenshotState: FAILED_STATE
                };
            }
        case TAKE_SCREENSHOT_LOADING:
            if (action.payload === 'morning') {
                return {
                    ...state,
                    morningScreenshotState: LOADING_STATE
                };
            }
            else if (action.payload === 'afternoon') {
                return {
                    ...state,
                    afternoonScreenshotState: LOADING_STATE
                };
            }
            else if (action.payload === 'evening') {
                return {
                    ...state,
                    eveningScreenshotState: LOADING_STATE
                };
            }
        default:
            return state;
    }
}