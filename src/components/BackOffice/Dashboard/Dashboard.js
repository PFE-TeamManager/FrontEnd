import React from 'react';
import SideBar from './SideBar/SideBar';
import MainMenu from './MainMenu/MainMenu';
import MainContent from './MainContent/MainContent';
import { Spinner } from '../../Global/Spinner';


class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    // componentDidMount() {
    //     if( !this.props.isAuthenticated ){
    //         this.props.history.push('/');//Redirect when user is not loggedin
    //     }
    // }

    render(){
        const {isAuthenticated,userData,logout} = this.props;
        if( isAuthenticated ) {

            if (null === userData) {
                return (<Spinner />);
            } else {
                return (
                    <div>
                        <MainMenu userData={userData} logout={logout} />
                        <SideBar />
                        <MainContent />
                    </div>
                );
            }

            
        } else {
            return null;
        }
    }

}

export default Dashboard;