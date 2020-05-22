import {combineReducers} from "redux";
import registration from "./reducers/registration";
import auth from "./reducers/auth";

export default combineReducers({
    auth,registration
});
