const TAKE_SCREENSHOT_SUCCESS = 'takeScreenshotSuccess';
const ADD_STOCK_SUCCESS = 'addStockSuccess';
const REMOVE_STOCK_SUCCESS = 'removeStockSuccess';
const ADD_STOCK_FAILED = 'addStockFailed';
const REMOVE_STOCK_FAILED = 'removeStockFailed';
const UPDATED_PAGE = 'updatedPage';

const initialState = {
    insertStockSuccess: true,
    removeStockSuccess: true,
    databaseUpdated: false
};

export default function stock(state = initialState, action) {
    switch (action.type) {
        case ADD_STOCK_SUCCESS:
            return {
                ...state,
                databaseUpdated: true,
                insertStockSucess: true
            };
        case REMOVE_STOCK_SUCCESS:
            return {
                ...state,
                databaseUpdated: true,
                insertStockSucess: true
            };
        case TAKE_SCREENSHOT_SUCCESS:
            return {
                ...state,
                databaseUpdated: true,
            };

        case ADD_STOCK_FAILED:
            return {
                ...state,
                insertStockSucess: false
            }
        case REMOVE_STOCK_FAILED:
            return {
                ...state,
                removeStockSucess: false
            }
        case UPDATED_PAGE:
            return {
                ...state,
                databaseUpdated: false
            }
        default:
            return state;
    }
}