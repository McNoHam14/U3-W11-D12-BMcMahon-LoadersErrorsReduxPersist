import {
  REMOVE_FROM_FAVOURITE,
  ADD_TO_FAVOURITE,
  STORE_JOBS,
  GET_JOBS_LOADING,
  GET_JOBS_ERROR,
} from "./action_types";

export const removeFromFavourites = (payload) => {
  return {
    type: REMOVE_FROM_FAVOURITE,
    payload: payload,
  };
};

export const addToFavourites = (payload) => {
  return {
    type: ADD_TO_FAVOURITE,
    payload: payload,
  };
};

export const fetchJobs = (baseEndpoint, query) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        dispatch(storeJobs(data));
        dispatch({
          type: GET_JOBS_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_JOBS_ERROR,
          payload: false,
        });
      } else {
        dispatch({
          type: GET_JOBS_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_JOBS_ERROR,
          payload: true,
        });
        alert("Error fetching results");
      }
    } catch (error) {
      dispatch({
        type: GET_JOBS_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_JOBS_ERROR,
        payload: true,
      });
      console.log(error);
    }
  };
};

const storeJobs = (payload) => {
  return {
    type: STORE_JOBS,
    payload: payload,
  };
};
