
import {
    FETCH_COLLECTIONS_START,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE
} from '../types/types';


const INITIAL_STATE = {
    data: null,
    isFetching: false,
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
                data: action.payload
            }
        case FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return {
                ...state
            }
    }
}


export default countryReducer;