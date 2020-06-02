import {
    MEMBER_LIST_REQUEST,MEMBER_LIST_ERROR,MEMBER_LIST_RECEIVED
  } from "../../../actions/constants";

export default(state = {
    members: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
    }, action) => {
    switch (action.type) {
        case MEMBER_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
        return state;
        case MEMBER_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                members: null
            };
        case MEMBER_LIST_RECEIVED:
            state = {
                ...state,
                members: action.data['hydra:member'],
                ///pageCount: hydraPageCount(action.data),
                isFetching: false
            };
            return state;
        default:
        return state;
    }
}