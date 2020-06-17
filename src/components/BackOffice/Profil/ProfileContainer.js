import React from 'react';
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import Avatar from 'react-avatar';
import InfoProfileForm from './information/InfoProfileForm';

const mapeStateToProps = state => ({
  userData: state.auth.userData
});

class ProfileContainer extends React.Component {
    
    constructor(props){
        super(props);
    }

    showInfo = (event) => {
        var elementClasses = document.getElementsByClassName("tab-profil");
        for (var i = 0; i < elementClasses.length; i++) {
            elementClasses[i].classList.remove('active');
            elementClasses[i].classList.remove('show');
        }


        var elementId = event.target.attributes["data-id"].nodeValue;
        var appMenu = document.getElementById(elementId);
        appMenu.classList.toggle("active");
        appMenu.classList.toggle("show");
    }

    handleDescription = () => {
        {
            if( this.props.userData.description ){
                return ( this.props.userData.description )
            } else {
                return ( <InfoProfileForm /> )
            }
        }
    }

    render() {
        const {isFetching} = this.props;

        if (isFetching) {
            return (
                <div className="row">
                    <div className="col-12">
                      <Spinner />
                    </div>
                </div>
            );
        }

        return (
            <div className="row user">
                <div className="col-md-12">
                    <div className="profile">
                        <div className="info">
                                <Avatar size="100"
                                        name={this.props.userData.username} />
                                <h4>{this.props.userData.username}</h4>
                                <p>
                                    { this.props.userData.roles.includes("ROLE_DEV") ? "Développeur" : "" }
                                    { this.props.userData.roles.includes("ROLE_CHEF_PROJET") ? "Chef Projet" : "" }
                                </p>
                        </div>
                        <div className="cover-image"></div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="tile p-0">
                        <ul className="nav flex-column nav-tabs user-tabs">
                            <li className="nav-item">
                                <a  className="nav-link active" 
                                    onClick = { this.showInfo.bind(this) } 
                                    href="#" data-id="user-info" 
                                    data-toggle="tab">
                                        Informations
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane tab-profil active" id="user-info">
                            <div className="card p-4">
                                { this.handleDescription() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapeStateToProps, null)(ProfileContainer);