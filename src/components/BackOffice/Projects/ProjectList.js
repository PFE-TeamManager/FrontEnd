import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../../Global/Message";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import "./css/ProjectList.css";

class ProjectList extends React.Component {

  render() {
    //The state is in the projectListReducer
    const {projects} = this.props;

    if (null === projects || 0 === projects.length) {
      return (<Message message="No projects available"/>);
    }

    return (
    <div>
      <TransitionGroup>
        {projects && projects.map(project => (
            <CSSTransition classNames="fade" key={project.id} timeout={1000}>
              <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                  <h3>
                    <Link to={`/dashboard/projects/${project.id}`}>{project.projectName}</Link>
                  </h3>
                  <p className="card-text bordet-top">
                    <small className="text-muted">
                      {timeago().format(project.createdAt)}
                    </small>
                  </p>
                </div>
              </div>
            </CSSTransition>
        ))}
      </TransitionGroup>
      
    </div>)
  }
}

export default ProjectList;
