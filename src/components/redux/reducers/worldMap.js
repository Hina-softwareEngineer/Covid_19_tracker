import {
    CONFIRMED_MAP,
    DEATHS_MAP,
    RECOVERED_MAP
} from '../types/types';


const INITIAL_STATE = {
    history: [],
}

const MapDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONFIRMED_MAP:
            return {
                ...state,
                history: action.data
            }
        case DEATHS_MAP:
            return {
                ...state,
                history: action.data
            }
        case RECOVERED_MAP:
            return {
                ...state,
                history: action.data
            }
        default:
            return {
                ...state
            }
    }
}


export default MapDataReducer;