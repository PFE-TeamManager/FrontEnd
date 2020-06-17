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
import BugContainer from '../../Bug/BugContainer';
import AllBugsListContainer from '../../Bug/AllBugsListContainer';
import ProfileContainer from '../../Profil/ProfileContainer';

class MainContent extends React.Component {
    render(){
        return (
            <div>
                <main className="app-content">
                    {/* The order of The Routes is so important */}
                    <Switch>
                        <Route path="/dashboard/projects/page/:page?" component={ProjectListContainer}/>
                        <Route path="/dashboard/alltasks/page/:page?" component={AllTasksListContainer} />
                        <Route path="/dashboard/allbugs/page/:page?" component={AllBugsListContainer} />
                        <Route path="/dashboard/projects/:id" component={ProjectContainer} />
                        <Route path="/dashboard/tasks/:id" component={TaskContainer} />
                        <Route path="/dashboard/bugs/:id" component={BugContainer} />
                        <Route path="/dashboard/projects" component={ProjectListContainer} />
                        <Route path="/dashboard/alltasks" component={AllTasksListContainer} />
                        <Route path="/dashboard/allbugs" component={AllBugsListContainer} />
                        <Route path="/dashboard/teams" component={MemberListContainer} />
                        <Route path="/dashboard/board" component={KanbanBoardContainer} />
                        <Route path="/dashboard/profil" component={ProfileContainer} />
                        <Route path="/dashboard" component={DashboardContent} />
                        <Route component={Notfound} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default MainContent; 