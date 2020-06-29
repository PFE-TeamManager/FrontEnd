import React from 'react';
import {connect} from "react-redux";
import {canCreateAuthorization} from "../../../../redux/apiUtils";
import { Spinner } from '../../../Global/Spinner';
import ChartTaskByProjects from './charts/ChartTaskByProjects';
import {dashboardCountTasksByProject} from "../../../../redux/actions/actions";

const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.dataCountTasksProjectsReducer
});

const mapDispatchToProps = {
    dashboardCountTasksByProject
};


class DashboardContent extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.dashboardCountTasksByProject();
    }

    render(){
        const {userData, dataCountTasksProjectsReducer,isFetching} = this.props;
console.log(dataCountTasksProjectsReducer);
        if (isFetching)  {
            return (<Spinner/>);
        }

        if (canCreateAuthorization(userData)) {
            return (
                <div className="row">
                    <div className="col-12">
                        Dashboard For Chef Projet
                    </div>
                    <div className="col-12">
                        <div className="mixed-chart">
                            <div className="card">
                                {dataCountTasksProjectsReducer && 
                                    <ChartTaskByProjects 
                                        dataCountTasks={dataCountTasksProjectsReducer.dataCountTasks}
                                        dataProjectName={dataCountTasksProjectsReducer.dataProjectName} />}
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);