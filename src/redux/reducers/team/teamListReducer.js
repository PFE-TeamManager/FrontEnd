import {
    TEAM_LIST_REQUEST,
    TEAM_LIST_RECEIVED,
    TEAM_LIST_ERROR, TEAM_LIST_SET_PAGE,TEAM_ADDED,
    MEMBER_LIST_REQUEST
  } from "../../actions/constants";
  
//import {hydraPageCount} from "../../apiUtils";
  
export default(state = {
  teams: null,
  isFetching: false,
  currentPage: 1,
  pageCount: null
}, action) => {
  switch (action.type) {
    case TEAM_ADDED:
      return {
        ...state,
        teams: [action.team, ...state.teams]
      };
    case TEAM_LIST_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case TEAM_LIST_RECEIVED:
      state = {
        ...state,
        teams: action.data['hydra:member'],
        ///pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case TEAM_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    case TEAM_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        teams: null
      };
    default:
      return state;
  }
}
  