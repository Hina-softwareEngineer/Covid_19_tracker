import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import countryReducer from './reducers/reducer';


const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['country']
}

const rootReducer = combineReducers({
    country: countryReducer,
});


export default persistReducer(persistConfig, rootReducer);