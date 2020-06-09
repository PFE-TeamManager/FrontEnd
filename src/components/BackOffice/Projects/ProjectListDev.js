import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../../Global/Message";

class ProjectListDev extends React.Component {

  render() {
    //The state is in the ProjectListDevReducer
    const {projects} = this.props;

    if (null === projects || 0 === projects.length) {
      return (<Message message="No projects available"/>);
    }

    return (
        <div className="mb-3 mt-3 card-project">
            <div className="row">
                {projects && projects.map(project => (
                    <div className="col-12 col-md-6">
                        <div  key={project.id} 
                            className={"card "+( project.enabled ? "bg-success" : "bg-danger" )+" mb-3"} >
                            <div className="card-body">
                                <h3 className="card-title">
                                <Link to={`/dashboard/projects/${project.id}`}>{project.projectName}</Link>
                                </h3>
                                <p className="card-text bordet-top">
                                <small className="text-muted">
                                    {timeago().format(project.createdAt)}
                                </small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }
}

export default ProjectListDev;
