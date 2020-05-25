import React from 'react';
import SideBar from './SideBar/SideBar';
import MainMenu from './MainMenu/MainMenu';
import MainContent from './MainContent/MainContent';


class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        if( !this.props.isAuthenticated ){
            this.props.history.push('/');//Redirect when user is not loggedin
        }
    }

    renderUser() {
        const {userData, logout} = this.props;
    
        if (null === userData) {
          return (<i className="fas fa-spinner fa-spin"/>);
        }
    
        return (
          <span>
            Hello {userData.name},&nbsp;
            <button className="btn btn-link btn-sm" href="#" onClick={logout}>Logout</button>
          </span>
        );
    }

    render(){
        const {isAuthenticated} = this.props;
        //console.log("Dashboard isAuthenticated : "+isAuthenticated);
        if( isAuthenticated ) {
            return (
                <div>
                    <MainMenu />
                    <SideBar />
                    <MainContent />
                </div>
            );
        } else {
            return null;
        }
    }

}

export default Dashboard;