import React from 'react';
import SideBar from './SideBar/SideBar';
import MainMenu from './MainMenu/MainMenu';

class Dashboard extends React.Component {

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
                <MainMenu />
                <SideBar />
            </div>
        );
    }
}

export default Dashboard;