import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {allBugsListNotifFetch,searchTask} from "../../../../redux/actions/actions";
import {connect} from "react-redux";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MyReactSwal = withReactContent(Swal);

const mapeStateToProps = state => ({
    ...state.allBugsListReducer
});

const mapDispatchToProps = {
    allBugsListNotifFetch,searchTask
};

class MainMenu extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            searhTerm: ''
        }
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

    searchTerm = () => {
        if( this.state.searhTerm ){
            this.props.searchTask(this.state.searhTerm);
        }
        MyReactSwal.fire({
            icon: 'error',
            title: 'Something goes wrong! Data is here and the state is altered, but the component don\'t change, Return to this',
        });
    }

    render(){
        const {allBugsListReducer} = this.props;

        return (
            <div>
                <header className="app-header">
                    <a className="app-header__logo">
                        Team Manager   
                    </a>
                    <div    className="app-sidebar__toggle" 
                            onClick = { this.sidenavToggle }
                            data-toggle="sidebar" 
                            aria-label="Hide Sidebar">
                    </div>
                    <ul className="app-nav">
                        <li className="app-search">
                            <input  className="app-search__input" 
                                    type="search" placeholder="Search"
                                    onChange={(e) => this.setState({ searhTerm: e.target.value })} />
                            <button className="app-search__button"
                                    onClick = { this.searchTerm }>
                                    <i className="fa fa-search"></i>
                            </button>
                        </li>
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
                                    <Link className="dropdown-item" 
                                        to={`/dashboard/profil`}>
                                        <i className="fa fa-user fa-lg"></i> 
                                        {this.props.userData.username}
                                    </Link>
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