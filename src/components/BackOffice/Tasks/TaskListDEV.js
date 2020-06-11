import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {connect} from "react-redux";
import {affectDEVTotaskPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal)

const mapStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = {
  affectDEVTotaskPATCH
};

class TaskListDEV extends React.Component {

  constructor(props){
    super();
    this.state = {
      affectedTaskId: '',
      taskAffectedTo : ''
    }
  }

  affectToUser = (taskId) => {
    this.setState({
      affectedTaskId: taskId,
      taskAffectedTo: "Task Affected To "+this.props.userData.username
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    affectDEVTotaskPATCH(taskId,this.props.userData.id);
  }

  handleAffectation = (taskUser,taskId) => {
    if( ((this.state.taskAffectedTo == "") && taskUser && taskUser.id) || ((this.state.taskAffectedTo) && taskUser && taskUser.id) ){
      return (
        <p className="card-text">
          Task Affected To {taskUser.username}
        </p>
      )
    } else if( (this.state.taskAffectedTo) && (taskId === this.state.affectedTaskId) ) {
      return (
        <p className="card-text">
          {this.state.taskAffectedTo}
        </p>
      )
    } else {
      return (
        <p className="card-text">
          <button className="btn btn-primary" onClick={ () => { this.affectToUser(taskId) } } >
            Choose The Task
          </button>
        </p>
      )
    }
  }

  render() {
    //,all
    const {taskList} = this.props;

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
                if( (this.props.userData.teams.id === task.IdProject.Teams[0].id ) ){
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
                              { this.handleAffectation(task.user,task.id) }
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskListDEV);