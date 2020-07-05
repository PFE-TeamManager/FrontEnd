import {
    DASHBOARD_STATE_TASK_ERROR,
    DASHBOARD_STATE_TASK_RECEIVED,
    DASHBOARD_STATE_TASK_REQUEST

  } from "../../actions/constants";
  
  export default (state = {
    dataStateTaskReducer: null,
    isFetching: false
  }, action) => {
    switch (action.type) {
      case DASHBOARD_STATE_TASK_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case DASHBOARD_STATE_TASK_RECEIVED:
        state = {
          ...state,
          dataStateTaskReducer: action.data,
          isFetching: false
        };
        return state;
      case DASHBOARD_STATE_TASK_ERROR:
        return {
          ...state,
          isFetching: false,
          dataStateTaskReducer: null
        };
      default:
        return state;
    }
  }
  