import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";

export class SearchContainer extends React.Component {
  render() {

    const {searchTask} = this.props;

    if (null === searchTask || 0 === searchTask.length) {
      return (<Message message="No Search Found"/>);
    }

    return (
      <div className="mb-3 mt-3 shadow-sm card-task">
        <div className="row">
            {searchTask && searchTask.map( (task,i) => {
              return (
                <div key={i} className="col-12 col-md-4">
                  <div className={"card text-white "+( task.enabled ? "bg-success-app" : "bg-danger-app" )+" mb-3"} >
                    <div className="card-header"> Tache N° {task.id} </div>
                    <div className="card-body border-bottom">
                      <h5 className="card-title">
                        <Link to={`/dashboard/tasks/${task.id}`}> {task.TaskTitle} </Link>
                      </h5>
                      <p className="card-text mb-0"> {task.TaskDescription} </p>
                    </div>
                  </div>
                </div>
              )
            })
            }
        </div>
      </div>
    )
  }
}
