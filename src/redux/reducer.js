import {combineReducers} from "redux";
import registration from "./reducers/Global/registrationReducer";
import auth from "./reducers/Global/authReducer";
import projectList from './reducers/project/projectListReducer';
import project from './reducers/project/projectReducer';

export default combineReducers({
    auth,registration,projectList,project
});
