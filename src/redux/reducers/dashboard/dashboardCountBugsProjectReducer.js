import {
    DASHBOARD_COUNT_BUGS_PROJECTS_ERROR,
    DASHBOARD_COUNT_BUGS_PROJECTS_RECEIVED,
    DASHBOARD_COUNT_BUGS_PROJECTS_REQUEST

  } from "../../actions/constants";
  
  export default (state = {
    dataCountBugsProjectsReducer: null,
    isFetching: false
  }, action) => {
    switch (action.type) {
      case DASHBOARD_COUNT_BUGS_PROJECTS_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case DASHBOARD_COUNT_BUGS_PROJECTS_RECEIVED:
        state = {
          ...state,
          dataCountBugsProjectsReducer: action.data,
          isFetching: false
        };
        return state;
      case DASHBOARD_COUNT_BUGS_PROJECTS_ERROR:
        return {
          ...state,
          isFetching: false,
          dataCountBugsProjectsReducer: null
        };
      default:
        return state;
    }
  }
  