const ADD_STOCK = 'addStock';
const REMOVE_STOCK = 'removeStock';

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
