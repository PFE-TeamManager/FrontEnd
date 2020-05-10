import React from 'react';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color : "Green",
            placeholder : '',
            valeur : ''
        }
    }

    colorHover = () => {
        this.setState(
            {color : "red"}
        );
    }

    colorClick = () => {
        this.setState(
            {color : "Blue"}
        );
    }

    colorOut = () => {
        this.setState(
            {color : "Yellow"}
        );
    }

    handleChange = (event) => {
        this.setState(
            {
                valeur : event.target.value.toUpperCase()
            }
        )
    }

    render(){
        return (
            <div>
                <section className="material-half-bg">
                    <div className="cover"></div>
                </section>
                <section className="login-content">
                    <div className="logo">
                        <h1>Team Manager</h1>
                    </div>
                    <div className="login-box">
                        <form className="login-form" action="index.html">
                            <h3 className="login-head"><i className="fa fa-lg fa-fw fa-user"></i>SIGN IN</h3>
                            <div className="form-group">
                                <label className="control-label">USERNAME</label>
                                <input className="form-control" type="text" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">PASSWORD</label>
                                <input className="form-control" type="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <div className="utility">
                                <div className="animated-checkbox">
                                    <label>
                                    <input type="checkbox"/><span className="label-text">Stay Signed in</span>
                                    </label>
                                </div>
                                <p className="semibold-text mb-2"><a href="#" data-toggle="flip">Forgot Password ?</a></p>
                                </div>
                            </div>
                            <div className="form-group btn-container">
                                <button className="btn btn-primary btn-block"><i className="fa fa-sign-in fa-lg fa-fw"></i>SIGN IN</button>
                            </div>
                        </form>
                        <form className="forget-form" action="index.html">
                            <h3 className="login-head" onClick = { this.colorClick }><i className="fa fa-lg fa-fw fa-lock"></i>Forgot Password ?</h3>
                            <div className="form-group">
                                <label className="control-label">EMAIL</label>
                                <input className="form-control" type="text" placeholder="Email"/>
                            </div>
                            <div className="form-group btn-container">
                                <button className="btn btn-primary btn-block"><i className="fa fa-unlock fa-lg fa-fw"></i>RESET</button>
                            </div>
                            <div className="form-group mt-3">
                                <p className="semibold-text mb-0"><a href="#" data-toggle="flip"><i className="fa fa-angle-left fa-fw"></i> Back to Login</a></p>
                            </div>
                        </form>
                    </div>
                </section>                  
            </div>
        );
    }
}

export default Login; 
