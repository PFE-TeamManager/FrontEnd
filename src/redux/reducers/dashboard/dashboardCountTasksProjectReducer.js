import {
    DASHBOARD_COUNT_TASKS_PROJECTS_ERROR,
    DASHBOARD_COUNT_TASKS_PROJECTS_RECEIVED,
    DASHBOARD_COUNT_TASKS_PROJECTS_REQUEST

  } from "../../actions/constants";
  
  export default (state = {
    dataCountTasksProjectsReducer: null,
    isFetching: false
  }, action) => {
    switch (action.type) {
      case DASHBOARD_COUNT_TASKS_PROJECTS_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case DASHBOARD_COUNT_TASKS_PROJECTS_RECEIVED:
        state = {
          ...state,
          dataCountTasksProjectsReducer: action.data,
          isFetching: false
        };
        return state;
      case DASHBOARD_COUNT_TASKS_PROJECTS_ERROR:
        return {
          ...state,
          isFetching: false,
          dataCountTasksProjectsReducer: null
        };
      default:
        return state;
    }
  }
  