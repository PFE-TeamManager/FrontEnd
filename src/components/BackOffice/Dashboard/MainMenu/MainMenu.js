import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {allBugsListNotifFetch} from "../../../../redux/actions/actions";
import {connect} from "react-redux";

const mapeStateToProps = state => ({
    ...state.allBugsListReducer
});

const mapDispatchToProps = {
    allBugsListNotifFetch
};

class MainMenu extends React.Component {

    constructor(props){
        super(props);

    }

    componentDidMount() {
        if( this.props.userData.teams ){
            this.props.allBugsListNotifFetch(this.props.userData.teams.project.id);
        } else {
            this.props.allBugsListNotifFetch(null);
        }
    }

    showMenu = () => {
        var appMenu = document.getElementById("dropdown-menu-list");
        appMenu.classList.toggle("show");
    }

    showNotifs = () => {
        var appNotif = document.getElementById("dropdown-notif-list");
        appNotif.classList.toggle("show");
    }

    sidenavToggle = () => {
        document.body.classList.toggle("sidenav-toggled");
    }

    render(){
        const {allBugsListReducer} = this.props;

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
                        {/* Notification Menu */}
                            <li className="dropdown">
                                <a  className="app-nav__item" href="#" 
                                    onClick = { this.showNotifs } 
                                    data-toggle="dropdown" aria-label="Show notifications">
                                        <i className="fa fa-bell-o fa-lg"></i>
                                </a>
                                <ul className="app-notification dropdown-menu dropdown-menu-right"
                                    id="dropdown-notif-list">
                                    <li className="app-notification__title">You have new notifications.</li>
                                    <div className="app-notification__content">
                                        {
                                            allBugsListReducer && allBugsListReducer.map( (bug,i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link   className="app-notification__item" 
                                                                to={`/dashboard/bugs/${bug.id}`}>
                                                            <span className="app-notification__icon">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                                                    <i className="fa fa-bug fa-stack-1x fa-inverse"></i>
                                                                </span>
                                                            </span>
                                                            <div>
                                                                <p className="app-notification__message">{bug.BugTitle}</p>
                                                                <p className="app-notification__meta">{timeago().format(bug.createdAt)}</p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </div>
                                </ul>
                            </li>
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

export default connect(mapeStateToProps, mapDispatchToProps)(MainMenu);