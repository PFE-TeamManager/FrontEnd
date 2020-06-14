import React from 'react';
import {connect} from "react-redux";
import {canCreateAuthorization} from "../../../../redux/apiUtils";
import { Spinner } from '../../../Global/Spinner';

const mapStateToProps = state => ({
    userData: state.auth.userData
});


class DashboardContent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const {userData,isFetching} = this.props;

        if (canCreateAuthorization(this.props.userData)) {
            return (
                <div className="row">
                    <div className="col-12">
                        Dashboard For Chef Projet
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-12">
                        Dashboard For Member
                    </div>
                </div>
            );
        }
    }

}

export default connect(mapStateToProps, null)(DashboardContent);