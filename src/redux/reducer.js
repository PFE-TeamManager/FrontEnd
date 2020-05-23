import {combineReducers} from "redux";
import registration from "./reducers/registrationReducer";
import auth from "./reducers/authReducer";
import projectList from './reducers/projectListReducer';

export default combineReducers({
    auth,registration,projectList
});
