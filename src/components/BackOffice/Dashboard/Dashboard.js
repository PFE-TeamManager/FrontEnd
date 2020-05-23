import React from 'react';
import SideBar from './SideBar/SideBar';
import MainMenu from './MainMenu/MainMenu';
import MainContent from './MainContent/MainContent';


class Dashboard extends React.Component {

    render(){
        return (
            <div>
                <MainMenu />
                <SideBar />
                <MainContent />
            </div>
        );
    }

}

export default Dashboard;