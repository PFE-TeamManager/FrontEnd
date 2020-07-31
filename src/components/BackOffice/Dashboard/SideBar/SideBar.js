import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import Avatar from 'react-avatar';

const menuItemsCHEF = [
    {
        id: 1,
        icon: "app-menu__icon fa fa-dashboard",
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: "app-menu__icon fa fa-users",
        text: "Teams",
        link: "/dashboard/teams"
    },
    {
        id: 3,
        icon: "app-menu__icon fa fa-product-hunt",
        text: "Projects",
        link: "/dashboard/projects"
    },
    {
        id: 4,
        icon: "app-menu__icon fa fa-tasks",
        text: "All Bugs",
        link: "/dashboard/allbugs"
    },
    {
        id: 5,
        icon: "app-menu__icon fa fa-tasks",
        text: "The Board",
        link: "/dashboard/board"
    }
];

const menuItemsDEV = [
    {
        id: 1,
        icon: "app-menu__icon fa fa-dashboard",
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: "app-menu__icon fa fa-tasks",
        text: "The Board",
        link: "/dashboard/board"
    },
    {
        id: 3,
        icon: "app-menu__icon fa fa-tasks",
        text: "All Tasks",
        link: "/dashboard/alltasks"
    },
    {
        id: 4,
        icon: "app-menu__icon fa fa-tasks",
        text: "All Bugs",
        link: "/dashboard/allbugs"
    }
];

class SideBar extends React.Component {

    render(){
        return (
            <div>
                <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                <aside className="app-sidebar">
                    <div className="app-sidebar__user">
                        <Avatar size="60" 
                                className="app-sidebar__user-avatar" 
                                name={this.props.userData.username} />
                        <div>
                            <p className="app-sidebar__user-name">
                                {this.props.userData.username}
                            </p>
                            <p className="app-sidebar__user-designation">
                                { this.props.userData.roles.includes("ROLE_DEV") ? "Développeur" : "" }
                                { this.props.userData.roles.includes("ROLE_CHEF_PROJET") ? "Chef Projet" : "" }
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