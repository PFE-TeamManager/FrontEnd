import {
    TASK_LIST_REQUEST,
    TASK_LIST_RECEIVED,
    TASK_LIST_ERROR, TASK_LIST_SET_PAGE,TASK_ADDED
  } from "../../actions/constants";
  //import {hydraPageCount} from "../apiUtils";
  
  export default(state = {
    tasks: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
  }, action) => {
    switch (action.type) {
      case TASK_ADDED:
        return {
          ...state,
          tasks: [action.task, ...state.tasks]
        };
      case TASK_LIST_REQUEST:
        state = {
          ...state,
          isFetching: true,
        };
        return state;
      case TASK_LIST_RECEIVED:
        state = {
          ...state,
          tasks: action.data['hydra:member'],
          //pageCount: hydraPageCount(action.data),
          isFetching: false
        };
        return state;
      case TASK_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          tasks: null
        };
      case TASK_LIST_SET_PAGE:
        return {
          ...state,
          currentPage: action.page
        };
      default:
        return state;
    }
  }
  