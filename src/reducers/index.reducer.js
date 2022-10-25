import { combineReducers } from 'redux';
import counter from './counter.reducer';
import stock from './addStock.reducer';

const rootReducer = combineReducers({
    counter,
    stock
});

export default rootReducer;