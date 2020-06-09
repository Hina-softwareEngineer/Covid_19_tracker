
import {
    FETCH_COLLECTIONS_START,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE
} from '../types/types';
import cleanedData from './cleaningData';

const INITIAL_STATE = {
    data: null,
    isFetching: false,
    cleanedData: [],
    errorMessage: undefined
}

const countryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: false,
            }
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.payload,
                cleanedData: cleanedData(action.payload)
            }
        case FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: true,
                errorMessage: action.payload
            }
        default:
            return {
                ...state
            }
    }
}


export default countryReducer;