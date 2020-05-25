import React from 'react';

class Notfound extends React.Component {

    //Pour Afficher le contenue des tables , on doit utiliser une boucle
    constructor(props){
        super(props);
    }

    componentDidMount() {
        if( !this.props.isAuthenticated ){
            setTimeout(() => {
                this.props.history.push('/');//Redirect when user is not loggedin
            }, 2000);
        }
    }

    render(){
        return(
            <h1>Not found</h1>
        );
    }

}

export default Notfound;