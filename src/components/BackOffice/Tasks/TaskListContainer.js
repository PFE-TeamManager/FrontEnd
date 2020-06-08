import React from 'react';
import {taskListFetch, taskListUnload,labelListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {TaskList} from "./TaskList";
import TaskForm from "./TaskForm";
import LabelForm from "./Labels/LabelForm";
import {LoadMore} from "../../Global/LoadMore";
import {canCreateAuthorization} from "../../../redux/apiUtils";

const mapeStateToProps = state => ({
  ...state.taskList,
  ...state.labelList,
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData
});

const mapDispatchToProps = {
  taskListFetch,labelListFetch,
  taskListUnload
};

class TaskListContainer extends React.Component {
  componentDidMount() {
    this.props.taskListFetch(this.props.projectId);
    this.props.labelListFetch();
  }

  componentWillUnmount() {
    this.props.taskListUnload();
  }

  onLoadMoreClick() {
    const {projectId, currentPage, taskListFetch} = this.props;
    taskListFetch(projectId, currentPage);
  }

  render() {
    const {labelList,isFetching, taskList, isAuthenticated, projectId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;

    if (isFetching && currentPage === 1) {
      return (<Spinner/>);
    }

    if (canCreateAuthorization(this.props.userData)) {
        return (
          <div className="row">
            <div className="col-12 col-md-6">
              <TaskList taskList={taskList}/>
              {showLoadMore && <LoadMore label="Load more Tasks..."
                                        onClick={this.onLoadMoreClick.bind(this)}
                                        disabled={isFetching}/>}
            </div>
            <div className="col-12 col-md-6">
              {isAuthenticated && <LabelForm />}
              {isAuthenticated && <TaskForm labelList={labelList} projectId={projectId}/>}
            </div>
          </div>
        )
    } else {
      return (
        <div className="row">
            <div className="col-12">
              <TaskList taskList={taskList}/>
              {showLoadMore && <LoadMore label="Load more Tasks..."
                                        onClick={this.onLoadMoreClick.bind(this)}
                                        disabled={isFetching}/>}
            </div>
        </div>
      )
    }
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(TaskListContainer);
