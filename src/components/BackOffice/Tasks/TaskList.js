import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";


export class TaskList extends React.Component {
  render() {
    const {taskList} = this.props;

    if (null === taskList || 0 === taskList.length) {
      return (<Message message="No Tasks yet"/>);
    }

    return (
      <div className="mb-3 mt-3 shadow-sm card-task">
        <TransitionGroup>
          {taskList.map( task => {
            return (
              <CSSTransition key={task.id} timeout={1000} classNames="fade">
                <div className={"card text-white "+( task.enabled ? "bg-success" : "bg-danger" )+" mb-3"} >
                  <div className="card-header"> Tache N° {task.id} </div>
                  <div className="card-body border-bottom">
                    <h5 className="card-title">
                      <Link to={`/dashboard/tasks/${task.id}`}> {task.TaskTitle} </Link>
                    </h5>
                    <p className="card-text mb-0"> {task.TaskDescription} </p>
                    <p className="card-text">
                      <small className="text-muted">
                        {timeago().format(task.createdAt)} by&nbsp; {task.createdBy.username}
                      </small>
                    </p>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    )
  }
}
