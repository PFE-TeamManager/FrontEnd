import {BUG_ERROR, BUG_RECEIVED, BUG_REQUEST, BUG_UNLOAD} from "../../actions/constants";

export default (state = {
  bug: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case BUG_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case BUG_RECEIVED:
      return {
        ...state,
        bug: action.data,
        isFetching: false
      };
    case BUG_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case BUG_UNLOAD:
      return {
        ...state,
        isFetching: false,
        bug: null
      };
    default:
      return state;
  }
}