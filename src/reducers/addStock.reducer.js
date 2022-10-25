const ADD_STOCK = 'addStock';
const REMOVE_STOCK = 'removeStock';

const initialState = {
    stockList: [],
    status: ''
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
        default:
            return state;
    }
}