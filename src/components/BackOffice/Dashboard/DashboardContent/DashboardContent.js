import React from 'react';
import {connect} from "react-redux";
import {canCreateAuthorization} from "../../../../redux/apiUtils";
import { Spinner } from '../../../Global/Spinner';
import ChartTaskByProjects from './charts/ChartTaskByProjects';
import ChartBugByProjects from './charts/ChartBugByProjects';
import ChartPieStateTask from './charts/ChartPieStateTask';
import {dashboardCountTasksByProject,dashboardCountBugsByProject,dashboardStateTask} from "../../../../redux/actions/actions";

const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.dataCountTasksProjectsReducer,
    ...state.dataCountBugsProjectsReducer,
    ...state.dataStateTaskReducer
});

const mapDispatchToProps = {
    dashboardCountTasksByProject,dashboardCountBugsByProject,dashboardStateTask
};


class DashboardContent extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.dashboardCountTasksByProject();
        this.props.dashboardCountBugsByProject();
        this.props.dashboardStateTask();
    }

    render(){
        const { userData,isFetching,
                dataCountTasksProjectsReducer, 
                dataCountBugsProjectsReducer, 
                dataStateTaskReducer} = this.props;

        if (isFetching)  {
            return (<Spinner/>);
        }

        if (canCreateAuthorization(userData)) {
            return (
                <div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mixed-chart">
                                <div className="card">
                                    {dataStateTaskReducer && 
                                        <ChartPieStateTask 
                                            dataSeries={dataStateTaskReducer.dataSeries}
                                            dataLabels={dataStateTaskReducer.dataLabels} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
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