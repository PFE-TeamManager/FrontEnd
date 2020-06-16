import {
    MY_BUGS_LIST_ERROR,
    MY_BUGS_LIST_RECEIVED,
    MY_BUGS_LIST_REQUEST

  } from "../../actions/constants";
  
  export default (state = {
    bugsToDoList: null,
    isFetching: false
  }, action) => {
    switch (action.type) {
      case MY_BUGS_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case MY_BUGS_LIST_RECEIVED:
        state = {
          ...state,
          bugsToDoList: action.data['hydra:member'],
          isFetching: false
        };
        return state;
      case MY_BUGS_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          bugsToDoList: null
        };
      
      default:
        return state;
    }
  }
  