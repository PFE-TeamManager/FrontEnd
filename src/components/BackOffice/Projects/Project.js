import React from 'react';
import timeago from 'timeago.js';
import {Message} from "../../Global/Message";

class Project extends React.Component {
  render() {
    const {project} = this.props;

    if (null === project) {
      return (<Message message="Project does not exist"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <h2>{project.projectName}</h2>
          <p className="card-text border-top">
            <small className="text-muted">
              {timeago().format(project.createdAt)} by&nbsp; {project.createdBy.username}
            </small>
          </p>
        </div>
      </div>
    )
  }
}

export default Project;
