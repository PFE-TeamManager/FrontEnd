import {
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_RECEIVED,
    PROJECT_LIST_ERROR, PROJECT_LIST_SET_PAGE,PROJECT_ADDED
  } from "../../actions/constants";
  import {hydraPageCount} from "../../apiUtils";
  
  export default(state = {
    projects: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
  }, action) => {
    switch (action.type) {
      case PROJECT_ADDED:
        return {
          ...state,
          projects: [action.project, ...state.projects]
        };
      case PROJECT_LIST_REQUEST:
        state = {
          ...state,
          isFetching: true,
        };
        return state;
      case PROJECT_LIST_RECEIVED:
        state = {
          ...state,
          projects: action.data['hydra:member'],
          pageCount: hydraPageCount(action.data),
          isFetching: false
        };
        return state;
      case PROJECT_LIST_SET_PAGE:
        return {
          ...state,
          currentPage: action.page
        };
      case PROJECT_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          projects: null
        };
      default:
        return state;
    }
  }
  