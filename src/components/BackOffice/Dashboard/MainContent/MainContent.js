import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notfound from "../../../Global/notfound";
import ProjectListContainer from '../../Projects/ProjectListContainer';
import ProjectContainer from '../../Projects/ProjectContainer';
import TaskContainer from '../../Tasks/TaskContainer';
import MemberListContainer from '../../Teams/MemberListContainer';
import DashboardContent from '../DashboardContent/DashboardContent';
import AllTasksListContainer from '../../Tasks/AllTasksListContainer';
import KanbanBoardContainer from '../../Kanban/KanbanBoardContainer';

class MainContent extends React.Component {
    render(){
        return (
            <div>
                <main className="app-content">
                    <div className="app-title">
                        <div>
                        <h1><i className="fa fa-dashboard"></i> Dashboard</h1>
                        <p>A free and open source Bootstrap 4 admin template</p>
                        </div>
                        <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                        </ul>
                    </div>
                    
                        {/* The order of The Routes is so important */}
                        <Switch>
                            <Route path="/dashboard/projects/page/:page?" component={ProjectListContainer}/>
                            <Route path="/dashboard/alltasks/page/:page?" component={AllTasksListContainer} />
                            <Route path="/dashboard/projects/:id" component={ProjectContainer} />
                            <Route path="/dashboard/tasks/:id" component={TaskContainer} />
                            <Route path="/dashboard/projects" component={ProjectListContainer} />
                            <Route path="/dashboard/alltasks" component={AllTasksListContainer} />
                            <Route path="/dashboard/teams" component={MemberListContainer} />
                            <Route path="/dashboard/mytasks" component={KanbanBoardContainer} />
                            <Route path="/dashboard" component={DashboardContent} />
                            <Route component={Notfound} />
                        </Switch>
                    
                </main>
            </div>
        );
    }
}

export default MainContent; 