import {
    BUG_ADDED,
    BUG_LIST_ERROR,
    BUG_LIST_RECEIVED,
    BUG_LIST_REQUEST,
    BUG_LIST_UNLOAD
  } from "../../actions/constants";
  import {hydraPageCount} from "../../apiUtils";
  
  export default (state = {
    bugList: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
  }, action) => {
    switch (action.type) {
      case BUG_ADDED:
        return {
          ...state,
          bugList: [action.bug, ...state.bugList]
          //posts: state.posts ? state.posts.concat(action.data) : state.posts
        };
      case BUG_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case BUG_LIST_RECEIVED:
        return {
          ...state,
          bugList: !state.bugList ? action.data['hydra:member']
            : state.bugList.concat(action.data['hydra:member']),
          isFetching: false,
          currentPage: state.currentPage + 1,
          pageCount: hydraPageCount(action.data)
        };
      case BUG_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          bugList: null
        };
      case BUG_LIST_UNLOAD:
        return {
          ...state,
          isFetching: false,
          bugList: null,
          currentPage: 1,
          pageCount: null
        };
      default:
        return state;
    }
  }
  