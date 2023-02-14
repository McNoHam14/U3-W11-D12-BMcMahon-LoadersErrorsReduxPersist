import {
  GET_JOBS_ERROR,
  GET_JOBS_LOADING,
  STORE_JOBS,
} from "../actions/action_types";

const initialState = {
  jobs: [],
  isLoading: true,
  isError: false,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case GET_JOBS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_JOBS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
