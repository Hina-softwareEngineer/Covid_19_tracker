import axios from "axios";
import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
} from "../types/types";

export const fetchDataStart = () => ({
  type: FETCH_COLLECTIONS_START,
});

export const fetchDataSuccess = () => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: JSON.parse(localStorage.getItem("covid")),
});

export const fetchDataFailure = (error) => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

export const fetchDataAsync = () => {
  return (dispatch) => {
    dispatch(fetchDataStart());

    axios
      .get("https://coronavirus-tracker-api.herokuapp.com/all")
      .then((res) => {
        localStorage.setItem("covid", JSON.stringify(res.data));
        dispatch(fetchDataSuccess());
      })
      .catch((err) => dispatch(fetchDataFailure(err)));
  };
};
