import {
    SEARCH_TASK_ERROR, 
    SEARCH_TASK_RECEIVED, 
    SEARCH_TASK_REQUEST} 
from "../../actions/constants";

export default (state = {
    searchTask: null,
    isFetching: false
}, action) => {
  switch (action.type) {
    case SEARCH_TASK_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SEARCH_TASK_RECEIVED:
      return {
        ...state,
        searchTask: action.data['hydra:member'],
        isFetching: false
      };
    case SEARCH_TASK_ERROR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
