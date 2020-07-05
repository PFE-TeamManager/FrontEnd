import {
    ALL_BUGS_LIST_SET_PAGE,
    ALL_BUGS_LIST_ERROR,
    ALL_BUGS_LIST_RECEIVED,
    ALL_BUGS_LIST_REQUEST

  } from "../../actions/constants";
  import {hydraPageCount} from "../../apiUtils";
  
  export default (state = {
    allBugsListReducer: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
  }, action) => {
    switch (action.type) {
      case ALL_BUGS_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case ALL_BUGS_LIST_RECEIVED:
        state = {
          ...state,
          allBugsListReducer: action.data['hydra:member'],
          pageCount: hydraPageCount(action.data),
          isFetching: false
        };
        return state;
      case ALL_BUGS_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          allBugsListReducer: null
        };
      case ALL_BUGS_LIST_SET_PAGE:
        return {
          ...state,
          currentPage: action.page
        };
      
      default:
        return state;
    }
  }
  