import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProjectListContainer from '../../Projects/ProjectListContainer';
import Notfound from "../../../notfound";

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
                    <div className="row">
                        <Switch>
                            <Route path="/dashboard/projects" component={ProjectListContainer} />
                            <Route component={Notfound} />
                        </Switch>
                    </div>
                </main>
            </div>
            );
    }
}

export default MainContent; 