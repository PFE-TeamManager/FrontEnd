import React from 'react';

class Notfound extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        if( !this.props.isAuthenticated ){
            setTimeout(() => {
                this.props.history.push('/');//Redirect when user is not loggedin
            }, 1000);
        }
    }

    render(){
        return(
            <h1>Not found</h1>
        );
    }

}

export default Notfound;