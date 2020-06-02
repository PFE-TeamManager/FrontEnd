import {combineReducers} from "redux";

import registration from "./reducers/Global/registrationReducer";
import auth from "./reducers/Global/authReducer";
import { reducer as formReducer } from "redux-form";
import {routerReducer} from "react-router-redux";

import projectList from './reducers/project/projectListReducer';
import project from './reducers/project/projectReducer';
import taskList from './reducers/task/taskListReducer.js';
import task from './reducers/task/taskReducer.js';
import commentList from './reducers/comment/commentListReducer';
import teamList from "./reducers/team/teamListReducer";
import memberList from "./reducers/team/member/memberListReducer";


//keep it That way, always router and form the last
export default combineReducers({
    registration,auth,
    projectList,project,
    taskList,commentList,
    task,teamList,memberList,

    router: routerReducer,
    form: formReducer
});
