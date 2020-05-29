import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";


const menuItems = [
    {
        id: 1,
        icon: "app-menu__icon fa fa-dashboard",
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: "app-menu__icon fa fa-user-circle",
        text: "Docs",
        link: "/dashboard/docs"
    },
    {
        id: 3,
        icon: "app-menu__icon fa fa-sign-in",
        text: "Projects",
        link: "/dashboard/projects"
    },
    {
        id: 4,
        icon: "app-menu__icon fa fa-tasks",
        text: "Tasks",
        link: "/dashboard/tasks"
    },
];

class SideBar extends React.Component {

    constructor(props){
        super(props);
    }

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
                            <p className="app-sidebar__user-designation">Frontend Developer</p>
                        </div>
                    </div>
                    <ul className="app-menu">    
                        {   
                            menuItems.map(
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