import {combineReducers} from "redux";
import registration from "./reducers/registration";
import auth from "./reducers/auth";
import projectList from './reducers/projectList';

export default combineReducers({
    auth,registration,projectList
});
