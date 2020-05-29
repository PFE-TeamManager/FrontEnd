import {TASK_ERROR, TASK_RECEIVED, TASK_REQUEST, TASK_UNLOAD} from "../../actions/constants";

export default (state = {
  task: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TASK_RECEIVED:
      return {
        ...state,
        task: action.data,
        isFetching: false
      };
    case TASK_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case TASK_UNLOAD:
      return {
        ...state,
        isFetching: false,
        task: null
      };
    default:
      return state;
  }
}
