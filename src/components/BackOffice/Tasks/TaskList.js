import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../../Global/Message";
import {TransitionGroup, CSSTransition} from "react-transition-group";

class TaskList extends React.Component {

  render() {
    //The state is in the TaskListReducer
    const {tasks} = this.props;

    if (null === tasks || 0 === tasks.length) {
      return (<Message message="No tasks available"/>);
    }

    return (
    <div>
      <TransitionGroup>
        {tasks && tasks.map(task => (
            <CSSTransition classNames="fade" key={task.id} timeout={1000}>
              <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                  <h3>
                    <Link to={`/dashboard/tasks/${task.id}`}>{task.TaskTitle}</Link>
                  </h3>
                  <p className="card-text bordet-top">
                    <small className="text-muted">
                      {timeago().format(task.createdAt)}
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

export default  TaskList;
