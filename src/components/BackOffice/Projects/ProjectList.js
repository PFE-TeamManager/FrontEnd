import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../../Global/Message";
import {TransitionGroup, CSSTransition} from "react-transition-group";

class ProjectList extends React.Component {

  render() {
    //The state is in the projectListReducer
    const {projects} = this.props;
    
    if (null === projects || 0 === projects.length) {
      return (<Message message="No projects available"/>);
    }

    return (
    <div className="mb-3 mt-3 shadow-sm card-project">
      <TransitionGroup>
        {projects && projects.map(project => (
            <CSSTransition classNames="fade" key={project.id} timeout={1000}>
              <div className={"card "+( project.enabled ? "bg-success" : "bg-danger" )+" mb-3"} >
                <div className="card-body">
                  <h3 className="card-title">
                    <Link to={`/dashboard/projects/${project.id}`}>{project.projectName}</Link>
                  </h3>
                  <p className="card-text bordet-top">
                    <small className="text-white">
                        {project.Teams[0].teamName}
                    </small>
                  </p>
                  <p className="card-text bordet-top">
                    <small className="text-white">
                        {timeago().format(project.createdAt)}
                    </small>
                  </p>
                </div>
              </div>
            </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
    )
  }
}

export default ProjectList;
