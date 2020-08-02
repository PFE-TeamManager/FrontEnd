import React from 'react';
import {taskListFetch, taskListUnload,labelListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {TaskList} from "./TaskList";
import TaskForm from "./TaskForm";
import LabelForm from "./Labels/LabelForm";
import {LoadMore} from "../../Global/LoadMore";
import {canCreateAuthorization} from "../../../redux/apiUtils";
import TaskListDEV from './TaskListDEV';

const mapeStateToProps = state => ({
  ...state.taskList,
  ...state.labelList,
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData
});

const mapDispatchToProps = {
  taskListFetch,
  labelListFetch,
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
    const {labelList, isFetching, taskList, isAuthenticated, projectId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;
    const options = [];

    if (isFetching && currentPage === 1) {
      
      return (<Spinner/>);

    }

    if (canCreateAuthorization(this.props.userData)) {

      { labelList && labelList.map( 
          (label,i) => {
            if( (label.enabled === true) ){
              options.push({
                value: label.id,
                label: label.labelName
              });
            }
          }
        ) 
      }

        return (
          <div>
            <div className="row">
                <div className="col-12 col-md-6">
                    {isAuthenticated && <LabelForm />}
                </div>
                <div className="col-12 col-md-6">
                    {isAuthenticated && <TaskForm projectId={projectId} listOptions={options} />}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                      <TaskList taskList={taskList}/>
                      {showLoadMore && <LoadMore label="Load more Tasks..."
                                                onClick={this.onLoadMoreClick.bind(this)}
                                                disabled={isFetching}/>}
                </div>
            </div>
          </div>
        )
    } else {
      return (
        <div className="row">
          <div className="col-12">
              <TaskListDEV taskList={taskList}/>
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
