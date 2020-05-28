import {combineReducers} from "redux";

import registration from "./reducers/Global/registrationReducer";
import auth from "./reducers/Global/authReducer";
import { reducer as formReducer } from "redux-form";
import {routerReducer} from "react-router-redux";

import projectList from './reducers/project/projectListReducer';
import project from './reducers/project/projectReducer';
import taskList from './reducers/task/taskListReducer';
import task from './reducers/task/taskReducer';


//keep it That way, always router and form the last
export default combineReducers({
    registration,auth,
    projectList,project,
    taskList,task,

    router: routerReducer,
    form: formReducer
});
