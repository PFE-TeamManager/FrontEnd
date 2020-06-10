import {
    ALL_TASKS_LIST_SET_PAGE,
    ALL_TASKS_LIST_ERROR,
    ALL_TASKS_LIST_RECEIVED,
    ALL_TASKS_LIST_REQUEST,
    ALL_TASKS_LIST_UNLOAD,

  } from "../../actions/constants";
  import {hydraPageCount} from "../../apiUtils";
  
  export default (state = {
    allTasksListReducer: null,labelList: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
  }, action) => {
    switch (action.type) {
      case ALL_TASKS_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case ALL_TASKS_LIST_RECEIVED:
        state = {
          ...state,
          allTasksListReducer: action.data['hydra:member'],
          pageCount: hydraPageCount(action.data),
          isFetching: false
        };
        return state;
      case ALL_TASKS_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          allTasksListReducer: null
        };
      case ALL_TASKS_LIST_SET_PAGE:
        return {
          ...state,
          currentPage: action.page
        };
      
      default:
        return state;
    }
  }
  