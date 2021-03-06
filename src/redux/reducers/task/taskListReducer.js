import {
    TASK_ADDED,
    TASK_LIST_ERROR,
    TASK_LIST_RECEIVED,
    TASK_LIST_REQUEST,
    TASK_LIST_UNLOAD
  } from "../../actions/constants";
  import {hydraPageCount} from "../../apiUtils";
  
  export default (state = {
    taskList: null,labelList: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
  }, action) => {
    switch (action.type) {
      case TASK_ADDED:
        return {
          ...state,
          taskList: [action.task, ...state.taskList]
          //posts: state.posts ? state.posts.concat(action.data) : state.posts
        };
      case TASK_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case TASK_LIST_RECEIVED:
        return {
          ...state,
          taskList: !state.taskList ? action.data['hydra:member']
            : state.taskList.concat(action.data['hydra:member']),
          isFetching: false,
          currentPage: state.currentPage + 1,
          pageCount: hydraPageCount(action.data)
        };
      case TASK_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          taskList: null
        };
      case TASK_LIST_UNLOAD:
        return {
          ...state,
          isFetching: false,
          taskList: null,
          currentPage: 1,
          pageCount: null
        };
      default:
        return state;
    }
  }
  