import axios from 'axios';
import {
    FETCH_COLLECTIONS_START,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE
} from '../types/types';


export const fetchDataStart = () => (
    {
        type: FETCH_COLLECTIONS_START,
    }
)


export const fetchDataSuccess = (countryData) => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: countryData
});

export const fetchDataFailure = error => ({
    type: FETCH_COLLECTIONS_FAILURE,
    payload: error
});


export const fetchDataAsync = () => {
    return dispatch => {
        dispatch(fetchDataStart());

        axios.get('https://coronavirus-tracker-api.herokuapp.com/all')
            .then(
                res =>
                    dispatch(fetchDataSuccess(res.data))
            )
            .catch(err =>
                dispatch(fetchDataFailure()))
    }
}