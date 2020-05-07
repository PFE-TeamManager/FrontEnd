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
            <div className="row">
                <div className="col-md-6 col-12">
                    <h2 style={{color : this.state.color}} > Message </h2>
                    <h2 style={{color : this.state.color}} > Message2 </h2>
                </div>
                <div className="col-md-6 col-12">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email"
                            value={this.state.valeur} onChange={this.handleChange} 
                            class="form-control" id="exampleInputEmail1" 
                            aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="button" onMouseOut= { this.colorOut } 
                                onMouseOver = { this.colorHover } 
                                onClick = { this.colorClick } class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login; 
