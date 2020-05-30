import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {userLogout, userProfileFetch, userSetId} from "./redux/actions/actions";
import Dashboard from './components/BackOffice/Dashboard/Dashboard';
import Notfound from "./components/Global/notfound";
import { requests } from './redux/agent';
import LoginForm from './components/Guard/Auth/LoginForm';
import RegistrationContainer from './components/Guard/Register/RegistrationContainer';


const mapStateToProps = state => ({
  ...state.auth
});

//To dispatch Action
const mapDispatchToProps = {
  userProfileFetch , userSetId, userLogout
};
class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('jwtToken');

    //SetToken 
    if (token) {
      requests.setToken(token);
    }
  }

  //Fetch user on Refreshing the page
  componentDidMount() {
    const userId = window.localStorage.getItem('userId');
    const {userSetId} = this.props;

    if (userId) {
      userSetId(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const {userId, userData, userProfileFetch} = this.props;

    //Fetch user on Refreshing the page
    if (prevProps.userId !== userId && userId !== null && userData === null) {
      userProfileFetch(userId);
    }
  }

  render() {
    const {isAuthenticated, userData, userLogout} = this.props;
    // console.log("App isAuthenticated : "+isAuthenticated);
    // console.log("App userData : "+userData);
    // console.log("App userLogout : "+userLogout);
    {/* Must verify The connection of the user to show either dahsboard or Guard  */}
    if( isAuthenticated ){
      return (
        <div className="App">
            <Dashboard isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} />
        </div>
      )
    } else {
      return (
        <div className="App">
            {/* Must verify The connection of the user to show either dahsboard or Guard  */}
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route path="/register" component={RegistrationContainer} />
              <Route component={Notfound} />
            </Switch>
        </div>
      )
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
