import React from 'react';
import './register.css';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color : "Green",
            placeholder : '',
            valeur : ''
        }
    }

    render(){
        return (
            <div>
                <div className="container-scroller d-flex">
                    <div className="container-fluid page-body-wrapper full-page-wrapper d-flex">
                        <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                            <div className="row flex-grow">
                                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                    <div className="auth-form-transparent text-left p-3">
                                    <div className="brand-logo">
                                        LOGO
                                    </div>
                                    <h4>New here?</h4>
                                    <h6 className="font-weight-light">Join us today! It takes only few steps</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                        <label>Username</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend bg-transparent">
                                            <span className="input-group-text bg-transparent border-right-0">
                                                <i className="mdi mdi-account-outline text-primary"></i>
                                            </span>
                                            </div>
                                            <input type="text" className="form-control form-control-lg border-left-0" placeholder="Username" />
                                        </div>
                                        </div>
                                        <div className="form-group">
                                        <label>Email</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend bg-transparent">
                                            <span className="input-group-text bg-transparent border-right-0">
                                                <i className="mdi mdi-email-outline text-primary"></i>
                                            </span>
                                            </div>
                                            <input type="email" className="form-control form-control-lg border-left-0" placeholder="Email" />
                                        </div>
                                        </div>
                                        <div className="form-group">
                                        <label>Country</label>
                                        <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                                            <option>Country</option>
                                            <option>United States of America</option>
                                            <option>United Kingdom</option>
                                            <option>India</option>
                                            <option>Germany</option>
                                            <option>Argentina</option>
                                        </select>
                                        </div>
                                        <div className="form-group">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend bg-transparent">
                                            <span className="input-group-text bg-transparent border-right-0">
                                                <i className="mdi mdi-lock-outline text-primary"></i>
                                            </span>
                                            </div>
                                            <input type="password" className="form-control form-control-lg border-left-0" id="exampleInputPassword" placeholder="Password" />                        
                                        </div>
                                        </div>
                                        <div className="mb-4">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                            <input type="checkbox" className="form-check-input" />
                                            I agree to all Terms & Conditions
                                            </label>
                                        </div>
                                        </div>
                                        <div className="mt-3">
                                        <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">SIGN UP</a>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                        Already have an account? <a href="login.html" className="text-primary">Login</a>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 register-half-bg d-none d-lg-flex flex-row">
                                    <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2018  All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register; 