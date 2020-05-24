import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './main.css';
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from "redux";
import createHistory from 'history/createBrowserHistory';
import { Provider } from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import { Route } from "react-router";
import App from './App';
import reducer from './redux/reducer';
import thunkMiddleware from 'redux-thunk';
//LoginForm
import {tokenMiddleware} from "./redux/middleware";

//This Store here will dispatch the tokenMiddleware, 
//then the tokenMiddleware will take care of the Reducer
//Then the reducer will change the state in store
// inside tokenMiddleware the token traitement happen
//The tokenMiddleware will only works if the dispatcher dispatchs it's actions , otherwise it will be skipped
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, tokenMiddleware)
);
const history = createHistory();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App}/>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
