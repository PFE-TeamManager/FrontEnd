import React from 'react';
import timeago from 'timeago.js';
import {Message} from "../../Global/Message";

class Task extends React.Component {
  render() {
    const {singleTask} = this.props;

    if (null === singleTask) {
      return (<Message message="Task does not exist"/>);
    }

    return (
      
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <h2>{singleTask.TaskTitle}</h2>
          <p className="card-text border-top">
            <small className="text-muted">
              {timeago().format(singleTask.createdAt)} by&nbsp; {singleTask.createdBy.username}
            </small>
          </p>
        </div>
      </div>
    )
  }
}

export default Task;
