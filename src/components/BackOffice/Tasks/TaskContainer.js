import React from 'react';
import Task from "./Task";
import {taskFetch,taskUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import CommentListContainer from '../Comment/CommentListContainer';
import BugListContainer from '../Bug/BugListContainer';

const mapStateToProps = state => ({
  ...state.task
});
//Dispatch Actions
const mapDispatchToProps = {
  taskFetch,taskUnload
};

class TaskContainer extends React.Component {

  componentDidMount() {
    //pass the id by parameter
    this.props.taskFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.taskUnload();
  }

  render() {

    const {task,isFetching} = this.props;

    if (isFetching) {
      return (<Spinner />);
    }

    return (
      <div className="row">
        <div className="col-12 col-md-6">
            <Task singleTask={task}/>
            {task && <CommentListContainer taskId={this.props.match.params.id}/>}
        </div>
        <div className="col-12 col-md-6">
            {task && <BugListContainer taskId={this.props.match.params.id}/>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
