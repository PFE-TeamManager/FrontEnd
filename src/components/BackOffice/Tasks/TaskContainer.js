import React from 'react';
import Task from "./Task";
import {taskFetch,taskUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import CommentListContainer from '../Comment/CommentListContainer';

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
      <div>
        <Task singleTask={task}/>
        {task && <CommentListContainer taskId={this.props.match.params.id}/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
