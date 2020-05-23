import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../../Message";

class ProjectList extends React.Component {

  render() {
    const {projects} = this.props;

    if (null === projects || 0 === projects.length) {
      return (<Message message="No projects available"/>);
    }

    return (<div>
      {projects && projects.map(project => (
        <div className="card mb-3 mt-3 shadow-sm" key={project.id}>
          <div className="card-body">
            <h3>
              <Link to={`/projects/${project.id}`}>{project.projectName}</Link>
              </h3>
            <p className="card-text bordet-top">
              <small className="text-muted">
                {timeago().format(project.createdAt)}
              </small>
            </p>
          </div>
        </div>
      ))}
    </div>)
  }
}

export default ProjectList;
