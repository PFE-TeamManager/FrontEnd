import React from 'react';
import timeago from 'timeago.js';
import {Message} from "../../Global/Message";
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {bugPATCHActivity,bugPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal);

const mapStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = {
  bugPATCHActivity,bugPATCH
};

class Bug extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bugState : '',
      editing: '',
      newName: ''
    }
  }

  showEditInput = () => {
    this.setState({
      editing: true
    })
  }

  deactivateBug = (bug) => {
    this.setState({
      bugState: false
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    bugPATCHActivity(bug.id,false);
  }

  activateBug = (bug) => {
    this.setState({
      bugState: true
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    bugPATCHActivity(bug.id,true);
  }


  handleActivityBtn = (bug) => {

    if( (this.state.bugState === true) ){
      return <button  onClick={ () => { this.deactivateBug(bug) } } 
                      className="btn btn-danger float-right m-1"> Deactivate Bug </button>
    } 
    if( (this.state.bugState === false) ) {
      return <button  onClick={ () => { this.activateBug(bug) } } 
                      className="btn btn-success float-right m-1"> Activate Bug </button>
    }
    
    if( (this.state.bugState == "") && (bug.enabled === true) ){
      return <button  onClick={ () => { this.deactivateBug(bug) } } 
                      className="btn btn-danger float-right m-1"> Deactivate Bug </button>
    } 
    if( (this.state.bugState == "") && (bug.enabled === false) ) {
      return <button  onClick={ () => { this.activateBug(bug) } } 
                      className="btn btn-success float-right m-1"> Activate Bug </button>
    }

  }


  editFunction = (bug) => {
    bugPATCH(bug.id,this.refs.newName.value);
    this.setState({
      editing: false,
      newName: this.refs.newName.value
    });
    MyReactSwal.fire({
      icon: 'success'
    });
  }


  handleEditingName = (bug) => {
    if( (this.state.editing === true) ){
      return (
        <div>
            <input  type="text" ref="newName" className="form-control"
                    defaultValue={ this.state.newName ? this.state.newName : bug.BugTitle}></input>
            <button className="btn btn-info" 
                    onClick={ () => {this.editFunction(bug)} } >
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
      return <h2>{ this.state.newName ? this.state.newName : bug.BugTitle}</h2>
    }
  }

  render() {
    const {singleBug} = this.props;

    if (null === singleBug) {
      return (<Message message="Bug does not exist"/>);
    }

    return (
        <div className="card mb-3 mt-3 shadow-sm">
            <div className="card-body">
                { singleBug.enabled ? <i className="text-warning fa fa-circle float-right"></i> : <i className="text-info fa fa-circle float-right"></i> }
                { this.handleEditingName(singleBug) }
                <p className="card-text border-top">
                    <small className="text-muted">
                    {timeago().format(singleBug.createdAt)} by&nbsp; {singleBug.createdBy.username}
                    </small>
                </p>
                <button className="btn btn-info float-right m-1" onClick={this.showEditInput}>
                    Edit Bug
                </button>
                { this.handleActivityBtn(singleBug) }
            </div>
        </div>
    )     

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bug);
