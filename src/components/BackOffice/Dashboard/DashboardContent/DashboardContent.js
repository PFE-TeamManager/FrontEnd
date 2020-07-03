import React from 'react';
import {connect} from "react-redux";
import {canCreateAuthorization} from "../../../../redux/apiUtils";
import { Spinner } from '../../../Global/Spinner';
import ChartTaskByProjects from './charts/ChartTaskByProjects';
import ChartBugByProjects from './charts/ChartBugByProjects';
import {dashboardCountTasksByProject,dashboardCountBugsByProject} from "../../../../redux/actions/actions";

const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.dataCountTasksProjectsReducer,
    ...state.dataCountBugsProjectsReducer
});

const mapDispatchToProps = {
    dashboardCountTasksByProject,dashboardCountBugsByProject
};


class DashboardContent extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.dashboardCountTasksByProject();
        this.props.dashboardCountBugsByProject();
    }

    render(){
        const {userData, dataCountTasksProjectsReducer, dataCountBugsProjectsReducer,isFetching} = this.props;

        if (isFetching)  {
            return (<Spinner/>);
        }

        if (canCreateAuthorization(userData)) {
            return (
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="mixed-chart">
                            <div className="card">
                                {dataCountTasksProjectsReducer && 
                                    <ChartTaskByProjects 
                                        dataCountTasks={dataCountTasksProjectsReducer.dataCountTasks}
                                        dataProjectName={dataCountTasksProjectsReducer.dataProjectName} />}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="mixed-chart">
                            <div className="card">
                                {dataCountBugsProjectsReducer && 
                                    <ChartBugByProjects 
                                        dataCountBugs={dataCountBugsProjectsReducer.dataCountBugs}
                                        dataProjectName={dataCountBugsProjectsReducer.dataProjectName} />}
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