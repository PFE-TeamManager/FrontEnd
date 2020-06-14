import {
    MY_TASKS_LIST_ERROR,
    MY_TASKS_LIST_RECEIVED,
    MY_TASKS_LIST_REQUEST

  } from "../../actions/constants";
  
  export default (state = {
    tasksToDoList: null,
    labelList: null,
    isFetching: false
  }, action) => {
    switch (action.type) {
      case MY_TASKS_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case MY_TASKS_LIST_RECEIVED:
        state = {
          ...state,
          tasksToDoList: action.data['hydra:member'],
          isFetching: false
        };
        return state;
      case MY_TASKS_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          tasksToDoList: null
        };
      
      default:
        return state;
    }
  }
  