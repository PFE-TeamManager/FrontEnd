import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";

export class TaskListDEV extends React.Component {
  render() {
    //,all
    const {taskList,userData} = this.props;
console.log(userData.teams.id);
    if (null === taskList || 0 === taskList.length) {
      return (<Message message="No Tasks DEV yet"/>);
    }

    // if( all ){
    //   return (
    //     <div className="mb-3 mt-3 card-task">
    //         <div className="row">
    //           {taskList.map( task => {
    //               return (
    //                   <div key={task.id} className="col-12 col-md-4">
    //                       <div className={"card text-white "+( task.enabled ? "bg-success" : "bg-danger" )+" mb-3"} >
    //                       <div className="card-header"> Tache N° {task.id} </div>
    //                       <div className="card-body border-bottom">
    //                           <h5 className="card-title">
    //                           <Link to={`/dashboard/tasks/${task.id}`}> {task.TaskTitle} </Link>
    //                           </h5>
    //                           <p className="card-text mb-0"> {task.TaskDescription} </p>
    //                           <p className="card-text">
    //                           <small className="text-muted">
    //                               {timeago().format(task.createdAt)} by&nbsp; {task.createdBy.username}
    //                           </small>
    //                           </p>
    //                       </div>
    //                       </div>
    //                   </div>
    //               );
    //           })}
    //         </div>
    //     </div>
    //   )
    // } else {
      return (
        <div className="mb-3 mt-3 card-task">
            <div className="row">
              {taskList.map( task => {
                if( (userData.teams.id === task.IdProject.Teams[0].id ) ){
                  return (
                      <div key={task.id} className="col-12 col-md-6">
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
                      </div>
                  );
                }
              })}
            </div>
        </div>
      )
    //}

  }
}
