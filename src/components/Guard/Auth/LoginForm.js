import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";

import {reduxForm, Field} from 'redux-form';
import {renderField} from "../../../redux/form";
import {connect} from 'react-redux';
import {userLoginAttempt} from "../../../redux/actions/actions";

//initial state in reducer
const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
  userLoginAttempt
};

class LoginForm extends React.Component {

    constructor(props){
        super(props);
    }

    //If Token changed , redirect
    componentDidUpdate(prevProps) {
        //compare the current token in props with the token from prevprops
        //prevprops & props are automatically available
        if (prevProps.token !== this.props.token) {
        //   console.log(prevProps);
        //   console.log(this.props);
          //The history in props is set in reducer.js
          this.props.history.push('/dashboard');//Redirect when user is loggedin
        }
    }
    
    onSubmit(values) {
        //dispatch userLoginAttempt action Then userLoginSuccess reducer where the state is changed
        return this.props.userLoginAttempt(
            values.username,
            values.password
        );
    }

    render(){
        //error are from redux-form
        const {handleSubmit, error} = this.props;

        return (
            <div>
                <section className="material-half-bg">
                    <div className="cover"></div>
                </section>
                <section className="login-content">
                    <div className="logo">
                        <h1>Team Manager</h1>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="login-box">
                        <form className="login-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <h3 className="login-head"><i className="fa fa-lg fa-fw fa-user"></i>SIGN IN</h3>
                            <div className="form-group">
                                {/* <label className="control-label">USERNAME</label>
                                <input className="form-control" type="text" placeholder="Email" /> */}
                                <Field name="username" label="Username" type="text" component={renderField} />
                            </div>
                            <div className="form-group">
                                {/* <label className="control-label">PASSWORD</label>
                                <input className="form-control" type="password" placeholder="Password" /> */}
                                <Field name="password" label="Password" type="password" component={renderField} />
                            </div>
                            <div className="form-group btn-container">
                                <button type="submit" className="btn btn-primary btn-block">
                                    <i className="fa fa-sign-in fa-lg fa-fw"></i>SIGN IN
                                </button>
                            </div>
                            <div className="form-group mt-3">
                                <p className="semibold-text mb-0">
                                    <Link to="/register">Create Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default reduxForm({
    form: 'LoginForm'
  })(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
