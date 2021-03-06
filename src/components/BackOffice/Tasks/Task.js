import React from 'react';
import timeago from 'timeago.js';
import {Message} from "../../Global/Message";
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {taskPATCHActivity,taskPATCH} from "../../../redux/actions/actions";
import {canCreateAuthorization} from "../../../redux/apiUtils";

const MyReactSwal = withReactContent(Swal);

const mapStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = {
  taskPATCHActivity,taskPATCH
};

class Task extends React.Component {

  constructor(props){
    super();
    this.state = {
      taskState : '',
      editing: '',
      newName: ''
    }
  }

  showEditInput = () => {
    this.setState({
      editing: true
    })
  }

  deactivateTask = (task) => {
    this.setState({
      taskState: false
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    taskPATCHActivity(task.id,false);
  }

  activateTask = (task) => {
    this.setState({
      taskState: true
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    taskPATCHActivity(task.id,true);
  }


  handleActivityBtn = (task) => {

    if( (this.state.taskState === true) ){
      return <button  onClick={ () => { this.deactivateTask(task) } } 
                      className="btn btn-danger float-right m-1"> Deactivate Task </button>
    } 
    if( (this.state.taskState === false) ) {
      return <button  onClick={ () => { this.activateTask(task) } } 
                      className="btn btn-success float-right m-1"> Activate Task </button>
    }
    
    if( (this.state.taskState == "") && (task.enabled === true) ){
      return <button  onClick={ () => { this.deactivateTask(task) } } 
                      className="btn btn-danger float-right m-1"> Deactivate Task </button>
    } 
    if( (this.state.taskState == "") && (task.enabled === false) ) {
      return <button  onClick={ () => { this.activateTask(task) } } 
                      className="btn btn-success float-right m-1"> Activate Task </button>
    }

  }


  editFunction = (task) => {
    taskPATCH(task.id,this.refs.newName.value);
    this.setState({
      editing: false,
      newName: this.refs.newName.value
    });
    MyReactSwal.fire({
      icon: 'success'
    });
  }


  handleEditingName = (task) => {
    if( (this.state.editing === true) ){
      return (
        <div>
            <input  type="text" ref="newName" className="form-control"
                    defaultValue={ this.state.newName ? this.state.newName : task.TaskTitle}></input>
            <button className="btn btn-info" 
                    onClick={ () => {this.editFunction(task)} } >
                    <i className="app-menu__icon fa fa-edit"></i>
            </button>
            <button className="btn btn-warning" 
                    onClick={ () => {this.setState({editing:''})} } >
                    <i className="app-menu__icon fa fa-window-close"></i>
            </button>
        </div>
      )
    }
    if( (this.state.editing === false) ){
      return <h2>{this.state.newName}</h2>
    }
    if( (this.state.editing === '') ){
      return <h2>{ this.state.newName ? this.state.newName : task.TaskTitle}</h2>
    }
  }

  render() {
    const {singleTask} = this.props;

    if (null === singleTask) {
      return (<Message message="Task does not exist"/>);
    }
    if (canCreateAuthorization(this.props.userData)) {
        return (
          <div className="card mb-3 mt-3 shadow-sm">
            <div className="card-body">
              { singleTask.enabled ? <i className="text-success fa fa-circle float-right"></i> : <i className="text-danger fa fa-circle float-right"></i> }
              { this.handleEditingName(singleTask) }
              <p className="card-text border-top">
                <small className="text-muted">
                  {timeago().format(singleTask.createdAt)} by&nbsp; {singleTask.createdBy.username}
                </small>
              </p>
              <p className="card-text border-top">
                  { singleTask.labels && singleTask.labels.map( (label,i) => {
                      return <span  key={i} className="badge m-1"
                                    style={{backgroundColor: label.color}}>{label.labelName}</span>
                    })
                  }
              </p>
              <button className="btn btn-info float-right m-1" onClick={this.showEditInput}>
                Edit Task
              </button>
              { this.handleActivityBtn(singleTask) }
            </div>
          </div>
        )
    } else {
      return (
        <div className="card mb-3 mt-3 shadow-sm">
          <div className="card-body">
            { singleTask.enabled ? <i className="text-success fa fa-circle float-right"></i> : <i className="text-danger fa fa-circle float-right"></i> }
            { this.handleEditingName(singleTask) }
            <p className="card-text border-top">
              <small className="text-muted">
                {timeago().format(singleTask.createdAt)} by&nbsp; {singleTask.createdBy.username}
              </small>
            </p>
            <p className="card-text border-top">
                { singleTask.labels && singleTask.labels.map( (label,i) => {
                    return <span  key={i} className="badge m-1"
                                  style={{backgroundColor: label.color}}>{label.labelName}</span>
                  })
                }
            </p>
          </div>
        </div>
      )     
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
