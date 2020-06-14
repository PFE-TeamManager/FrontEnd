import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import './register.css';

import {reduxForm, Field} from 'redux-form';
import {renderField} from "../../../redux/form";
import {connect} from 'react-redux';
import {userRegister} from "../../../redux/actions/actions";

const mapDispatchToProps = {
userRegister
};

class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            termsAccepted: false,
            passwordHandling: false,
            confirmPasswordHandling: false,
            error: '',
        };
    }

    handleChangePassword = (event) => {
        if(event.target.value.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}$")!=null) {
            this.setState(
                {passwordHandling: !this.state.passwordHandling}
            );
        }
    }

    handleChangeConfirmPassword = (event) => {
        if(event.target.value.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}$")!=null) {
            this.setState(
                {confirmPasswordHandling: !this.state.confirmPasswordHandling}
            );
        }
    }

    onTermsAcceptedClick = (event) => {
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}));
    }

    onSubmit(values) {        
        if( values.password !== values.confirmPassword ){
            this.setState({error : "Passwords must be Identique"})
        }else {
            this.setState({error : ""});
        }

        if( this.state.passwordHandling 
            && this.state.confirmPasswordHandling 
            && (this.state.error === '') ){
            return this.props.userRegister(...Object.values(values))
                                .then(() => {
                                    this.props.reset();
                                });
        } 
    }

    render(){
        //error are from redux-form
        const {handleSubmit, submitting} = this.props;


        return (
            <div>
                <div className="container-scroller d-flex">
                    <div className="container-fluid page-body-wrapper full-page-wrapper d-flex">
                        <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                            <div className="row flex-grow">
                                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                    <div className="auth-form-transparent text-left p-3">
                                    <div className="brand-logo">
                                        Team Manager
                                    </div>
                                    <h4>New here?</h4>
                                    <h6 className="font-weight-light">Join us today! It takes only few steps</h6>
                                    
                                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}

                                    <form  className="pt-3" 
                                           onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <div className="form-group">
                                            <Field name="username" className="form-control form-control-lg border-left-0"
                                                label="Username" type="text" component={renderField} />
                                        </div>
                                        <div className="form-group">
                                            <Field name="email" className="form-control form-control-lg border-left-0"
                                                label="Email" type="email" component={renderField} />
                                        </div>
                                        <div className="form-group">
                                            <Field  name="password" 
                                                    className="form-control form-control-lg border-left-0" 
                                                    label="Password"
                                                    onChange={this.handleChangePassword}
                                                    type="password" component={renderField} />

                                            { !this.state.passwordHandling && <p className="text-danger">Password must be seven characters long and contain at least one digit, one upper case letter and one lower case letter</p>}
                                            
                                        </div>
                                        <div className="form-group">
                                            <Field  name="confirmPassword" 
                                                    className="form-control form-control-lg border-left-0" 
                                                    label="Confirm Password"
                                                    onChange={this.handleChangeConfirmPassword}
                                                    type="password" component={renderField} reduired="required"/>

                                            { !this.state.confirmPasswordHandling && <p className="text-danger">Password must be seven characters long and contain at least one digit, one upper case letter and one lower case letter</p>}
                                            
                                        </div>

                                        <div className="form-check form-group">
                                            <input className="form-check-input" type="checkbox"
                                                    value={false}
                                                    onClick={this.onTermsAcceptedClick.bind(this)}
                                                    disabled={!this.state.passwordHandling|| !this.state.confirmPasswordHandling}/>
                                            <label className="form-check-label">
                                                I agree to the terms and conditions
                                            </label>
                                        </div>

                                        <div className="mt-3">
                                            <button type="submit" 
                                                    disabled={submitting || !this.state.termsAccepted}
                                                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                                                Register Member
                                            </button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Already have an account?
                                            <Link to="/" className="text-primary">Login</Link>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 register-half-bg d-none d-lg-flex flex-row">
                                    <p className="text-white font-weight-medium text-center flex-grow align-self-end">
                                        Team Manager Copyright &copy; 2020  All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'RegisterForm'
  })(connect(null, mapDispatchToProps)(RegisterForm));