import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";


const menuItemsCHEF = [
    {
        id: 1,
        icon: "app-menu__icon fa fa-charte-line",
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: "app-menu__icon fa fa-project-diagram",
        text: "Projects",
        link: "/dashboard/projects"
    },
    {
        id: 3,
        icon: "app-menu__icon fa fa-users",
        text: "Teams",
        link: "/dashboard/teams"
    }
];

const menuItemsDEV = [
    {
        id: 1,
        icon: "app-menu__icon fa fa-charte-line",
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: "app-menu__icon fa fa-project-diagram",
        text: "Projects",
        link: "/dashboard/projects"
    },
    {
        id: 3,
        icon: "app-menu__icon fa fa-doc",
        text: "Tasks",
        link: "/dashboard/taskslistdev"
    }
];

class SideBar extends React.Component {

    render(){
        return (
            <div>
                <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                <aside className="app-sidebar">
                    <div className="app-sidebar__user">
                        <img className="app-sidebar__user-avatar" src="#" alt="User Image" />
                        <div>
                            <p className="app-sidebar__user-name">
                                {this.props.userData.username}
                            </p>
                            <p className="app-sidebar__user-designation">
                                { this.props.userData.roles.includes("ROLE_DEV") ? <h4>Développeur</h4> : "" }
                                { this.props.userData.roles.includes("ROLE_CHEF_PROJET") ? <h4>Chef Projet</h4> : "" }
                            </p>
                        </div>
                    </div>
                    <ul className="app-menu">    
                        {   
                            this.props.userData.roles.includes("ROLE_CHEF_PROJET") && menuItemsCHEF.map(
                                menuItem => {   
                                    return(
                                        <li key={menuItem.id}>
                                            <Link className="app-menu__item" to={menuItem.link}>
                                                <i className={menuItem.icon}></i>
                                                <span className="app-menu__label">{menuItem.text}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                            )
                        }
                        {   
                            this.props.userData.roles.includes("ROLE_DEV") && menuItemsDEV.map(
                                menuItem => {   
                                    return(
                                        <li key={menuItem.id}>
                                            <Link className="app-menu__item" to={menuItem.link}>
                                                <i className={menuItem.icon}></i>
                                                <span className="app-menu__label">{menuItem.text}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                            )
                        }
                    </ul>
                </aside>
            </div>
        );
    }
}

export default SideBar; 