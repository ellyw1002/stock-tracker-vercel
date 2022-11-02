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
            return {
                ...state,
                stockList: state.stockList.map((stockObject, index) =>
                    action.payload[index] ?
                        { ...stockObject, morningScreenshot: action.payload[index] } : stockObject),
                morningScreenshotState: DONE_STATE
            };
        case TAKE_SCREENSHOT_FAILED:
            return {
                ...state,
                morningScreenshotState: FAILED_STATE
            };
        case TAKE_SCREENSHOT_LOADING:
            return {
                ...state,
                morningScreenshotState: LOADING_STATE
            };
        default:
            return state;
    }
}