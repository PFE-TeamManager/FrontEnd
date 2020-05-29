import React from 'react';
import TaskList from "./TaskList";
import {taskListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import TaskForm from './TaskForm';

const mapStateToProps = state => ({
  ...state.taskList
});

const mapDispatchToProps = {
  taskListFetch
};

class TaskListContainer extends React.Component {

  componentDidMount() {
    this.props.taskListFetch();
  }

  render() {

    const {tasks,isFetching} = this.props;

    if (isFetching) {
      return (<Spinner />);
    }

    return (
      <div className="row">
          <div className="col-12 col-md-6">
            <TaskList tasks={tasks}/>
          </div>
          <div className="col-12 col-md-6">
            {/* here must be check of the role chef projet */}
            <TaskForm />
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
