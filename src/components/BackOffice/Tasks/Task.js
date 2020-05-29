import React from 'react';
import timeago from 'timeago.js';
import {Message} from "../../Global/Message";

class Task extends React.Component {
  render() {
    const {task} = this.props;

    if (null === task) {
      return (<Message message="Task does not exist"/>);
    }

    return (
      
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <h2>{task.TaskTitle}</h2>
          <p className="card-text border-top">
            <small className="text-muted">
              {timeago().format(task.createdAt)} by&nbsp; {task.createdBy.username}
            </small>
          </p>
        </div>
      </div>
    )
  }
}

export default Task;
