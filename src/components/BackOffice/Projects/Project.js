import React from 'react';
import timeago from 'timeago.js';
import {Message} from "../../Global/Message";
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {projectPATCHActivity,projectPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal)

const mapDispatchToProps = {
  projectPATCHActivity,projectPATCH
};

class Project extends React.Component {

  constructor(props){
    super();
    this.state = {
      projectState : '',
      editing: '',
      newName: ''
    }
  }

  showEditInput = () => {
    this.setState({
      editing: true
    })
  }

  deactivateProject = (project) => {
    this.setState({
      projectState: false
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    projectPATCHActivity(project.id,false);
  }

  activateProject = (project) => {
    this.setState({
      projectState: true
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    projectPATCHActivity(project.id,true);
  }

  handleActivityBtn = (project) => {

    if( (this.state.projectState === true) ){
      return <button  onClick={ () => { this.deactivateProject(project) } } 
                      className="btn btn-danger float-right m-1"> Deactivate Project </button>
    } 
    if( (this.state.projectState === false) ) {
      return <button  onClick={ () => { this.activateProject(project) } } 
                      className="btn btn-success float-right m-1"> Activate Project </button>
    }

    if( (this.state.projectState == "") && (project.enabled === true) ){
      return <button  onClick={ () => { this.deactivateProject(project) } } 
                      className="btn btn-danger float-right m-1"> Deactivate Project </button>
    } 
    if( (this.state.projectState == "") && (project.enabled === false) ) {
      return <button  onClick={ () => { this.activateProject(project) } } 
                      className="btn btn-success float-right m-1"> Activate Project </button>
    }

  }


  editFunction = (project) => {
    projectPATCH(project.id,this.refs.newName.value);
    this.setState({
      editing: false,
      newName: this.refs.newName.value
    });
    MyReactSwal.fire({
      icon: 'success'
    });
  }


  handleEditingName = (project) => {
    if( (this.state.editing === true) ){
      return (
        <div>
            <input  type="text" ref="newName" className="form-control"
                    defaultValue={ this.state.newName ? this.state.newName : project.projectName}></input>
            <button className="btn btn-info" 
                    onClick={ () => {this.editFunction(project)} } >
                    <i className="app-menu__icon fa fa-edit"></i>
            </button>
            <button className="btn btn-warning" 
                    onClick={ () => {this.setState({editing:''})} } >
                    <i className="app-menu__icon fa-window-close"></i>
            </button>
        </div>
      )
    }
    if( (this.state.editing === false) ){
      return <h2>{this.state.newName}</h2>
    }
    if( (this.state.editing === '') ){
      return <h2>{ this.state.newName ? this.state.newName : project.projectName}</h2>
    }
  }


  render() {
    const {project} = this.props;

    if (null === project) {
      return (<Message message="Project does not exist"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          { project.enabled ? <i className="text-success fa fa-circle float-right"></i> : <i className="text-danger fa fa-circle float-right"></i> }
          { this.handleEditingName(project) }
          <p className="card-text border-top">
            <small className="text-muted">
              {timeago().format(project.createdAt)} by&nbsp; {project.createdBy.username}
            </small>
          </p>
          <button className="btn btn-info float-right m-1" onClick={this.showEditInput}>
            Edit Project
          </button>
          { this.handleActivityBtn(project) }
        </div>
      </div>
    )
  }

}

export default connect(null, mapDispatchToProps)(Project);
