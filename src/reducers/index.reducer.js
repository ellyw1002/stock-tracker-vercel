import { combineReducers } from 'redux';
import counter from './counter.reducer';
import stock from './stockTable.reducer';

const rootReducer = combineReducers({
    counter,
    stock
});

export default rootReducer;