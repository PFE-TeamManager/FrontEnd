import {combineReducers} from "redux";

import registration from "./reducers/Global/registrationReducer";
import auth from "./reducers/Global/authReducer";
import projectList from './reducers/project/projectListReducer';
import project from './reducers/project/projectReducer';
import { reducer as formReducer } from "redux-form";
import {routerReducer} from "react-router-redux";

export default combineReducers({
    registration,projectList,project,
    form: formReducer,
    router: routerReducer,
    auth
});
