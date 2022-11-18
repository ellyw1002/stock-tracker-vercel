const ADD_STOCK = 'addStock';
const REMOVE_STOCK = 'removeStock';
const ADD_STOCK_SUCCESS = 'addStockSuccess';
const REMOVE_STOCK_SUCCESS = 'removeStockSuccess';
const ADD_STOCK_FAILED = 'addStockFailed';
const REMOVE_STOCK_FAILED = 'removeStockFailed';

export const addStockAction = (stockSymbol) => {
    return {
        type: ADD_STOCK,
        payload: stockSymbol,
    };
};

export const removeStockAction = (index) => {
    return {
        type: REMOVE_STOCK,
        payload: index,
    };
};

export const addStockFulfilledAction = () => {
    return {
        type: ADD_STOCK_SUCCESS
    };
};

export const addStockFailedAction = () => {
    return {
        type: ADD_STOCK_FAILED
    };
};

export const removeStockFulfilledAction = () => {
    return {
        type: REMOVE_STOCK_SUCCESS
    };
};

export const removeStockFailedAction = () => {
    return {
        type: REMOVE_STOCK_FAILED
    };
}

