import {combineReducers} from "redux";

import registration from "./reducers/Global/registrationReducer";
import auth from "./reducers/Global/authReducer";
import { reducer as formReducer } from "redux-form";
import {routerReducer} from "react-router-redux";

import projectList from './reducers/project/projectListReducer';
import project from './reducers/project/projectReducer';
import taskList from './reducers/task/taskListReducer.js';
import allTasksListReducer from './reducers/task/allTaskListReducer.js';
import tasksToDoList from './reducers/task/tasksToDoList.js';
import labelList from './reducers/task/labelListReducer.js';
import task from './reducers/task/taskReducer.js';
import commentList from './reducers/comment/commentListReducer';
import teamList from "./reducers/team/teamListReducer";
import memberList from "./reducers/team/member/memberListReducer";

import bugList from './reducers/bug/bugListReducer.js';
import bug from './reducers/bug/bugReducer.js';
import allBugsListReducer from './reducers/bug/allBugListReducer.js';
import bugsToDoList from './reducers/bug/bugsToDoList.js';

import searchTask from './reducers/search/searchReducer.js';
import dataCountTasksProjectsReducer from './reducers/dashboard/dashboardCountTasksProjectReducer.js';


//keep it That way, always router and form the last
export default combineReducers({
    registration,auth,
    projectList,project,
    taskList,commentList,
    task,teamList,memberList,
    labelList,allTasksListReducer,tasksToDoList,
    bugList,bug,allBugsListReducer,bugsToDoList,searchTask,
    dataCountTasksProjectsReducer,
    router: routerReducer,
    form: formReducer
});
