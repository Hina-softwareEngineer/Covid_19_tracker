import { combineReducers } from 'redux';
import countryReducer from './reducers/reducer';
import worldMap from './reducers/worldMap';



const rootReducer = combineReducers({
    country: countryReducer,
    map: worldMap,
});


export default rootReducer;