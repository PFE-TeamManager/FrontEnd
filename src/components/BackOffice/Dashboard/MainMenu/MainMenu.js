import React from 'react';

class MainMenu extends React.Component {

    constructor(props){
        super(props);
    }

    showMenu = () => {
        var appMenu = document.getElementById("dropdown-menu-list");
        appMenu.classList.toggle("show");
    }

    sidenavToggle = () => {
        document.body.classList.toggle("sidenav-toggled");
    }

    render(){

        return (
            <div>
                <header className="app-header">
                        <a className="app-header__logo">
                            Team Manager   
                        </a>
                        <div  className="app-sidebar__toggle" 
                            onClick = { this.sidenavToggle }
                            data-toggle="sidebar" aria-label="Hide Sidebar">
                        </div>
                        <ul className="app-nav">
                            <li className="dropdown">
                                <a  className="app-nav__item" href="#"
                                    onClick = { this.showMenu } 
                                    data-toggle="dropdown" aria-label="Open Profile Menu">
                                    <i className="fa fa-user fa-lg"></i>
                                </a>
                                <ul className="dropdown-menu settings-menu dropdown-menu-right" 
                                    id="dropdown-menu-list">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fa fa-user fa-lg"></i> 
                                            {this.props.userData.username}
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="fa fa-cog fa-lg"></i> 
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" 
                                            onClick={this.props.logout}>
                                            <i className="fa fa-sign-out fa-lg"></i> 
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                </header>
            </div>
            );
    }
}

export default MainMenu; 