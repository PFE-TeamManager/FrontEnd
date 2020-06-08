import {
    LABEL_ADDED,
    LABEL_LIST_ERROR,
    LABEL_LIST_RECEIVED,
    LABEL_LIST_REQUEST,
    LABEL_LIST_UNLOAD
  } from "../../actions/constants";
  import {hydraPageCount} from "../../apiUtils";
  
  export default (state = {
    labelList: null,
    isFetching: false
  }, action) => {
    switch (action.type) {
      case LABEL_ADDED:  
        return {
          ...state,
          labelList: [action.label, ...state.labelList]
          //posts: state.posts ? state.posts.concat(action.data) : state.posts
        };
      case LABEL_LIST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case LABEL_LIST_RECEIVED:
        return {
          ...state,
          labelList: !state.labelList ? action.data['hydra:member']
            : state.labelList.concat(action.data['hydra:member']),
          isFetching: false
        };
      case LABEL_LIST_ERROR:
        return {
          ...state,
          isFetching: false,
          labelList: null
        };
      case LABEL_LIST_UNLOAD:
        return {
          ...state,
          isFetching: false,
          labelList: null
        };
      default:
        return state;
    }
  }
  