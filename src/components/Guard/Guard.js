import React from 'react';
import Login from './Auth/Login';

class Guard extends React.Component {

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
            <Login />
        );
    }
}

export default Guard; 