import React from 'react';

class SideBar extends React.Component {

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
                <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                <aside className="app-sidebar">
                    <div className="app-sidebar__user">
                            <img className="app-sidebar__user-avatar" src="#" alt="User Image" />
                            <div>
                            <p className="app-sidebar__user-name">John Doe</p>
                            <p className="app-sidebar__user-designation">Frontend Developer</p>
                        </div>
                    </div>
                    <ul className="app-menu">
                        <li>
                            <a className="app-menu__item active" href="dashboard.html">
                                <i className="app-menu__icon fa fa-dashboard"></i>
                                <span className="app-menu__label">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a className="app-menu__item" href="docs.html">
                                <i className="app-menu__icon fa fa-file-code-o"></i>
                                <span className="app-menu__label">Docs</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
            );
    }
}

export default SideBar; 