import React from 'react';
import {taskListFetch, taskListUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {TaskList} from "./TaskList";
import TaskForm from "./TaskForm";
import {LoadMore} from "../../Global/LoadMore";

const mapeStateToProps = state => ({
  ...state.taskList,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  taskListFetch,
  taskListUnload
};

class TaskListContainer extends React.Component {
  componentDidMount() {
    this.props.taskListFetch(this.props.projectId);
  }

  componentWillUnmount() {
    this.props.taskListUnload();
  }

  onLoadMoreClick() {
    const {projectId, currentPage, taskListFetch} = this.props;
    taskListFetch(projectId, currentPage);
  }

  render() {
    const {isFetching, taskList, isAuthenticated, projectId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;

    if (isFetching && currentPage === 1) {
      return (<Spinner/>);
    }

    return (
      <div>
        <TaskList taskList={taskList}/>
        {showLoadMore && <LoadMore label="Load more Tasks..."
                                   onClick={this.onLoadMoreClick.bind(this)}
                                   disabled={isFetching}/>}
        {isAuthenticated && <TaskForm projectId={projectId}/>}
      </div>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(TaskListContainer);
