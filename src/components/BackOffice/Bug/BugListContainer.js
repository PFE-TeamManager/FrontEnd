import React from 'react';
import {bugListFetch, bugListUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {BugList} from "./BugList";
import BugForm from "./BugForm";
import {LoadMore} from "../../Global/LoadMore";

const mapeStateToProps = state => ({
  ...state.bugList,
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData
});

const mapDispatchToProps = {
  bugListFetch,bugListUnload
};

class BugListContainer extends React.Component {
  componentDidMount() {
    this.props.bugListFetch(this.props.taskId);
  }

  componentWillUnmount() {
    this.props.bugListUnload();
  }

  onLoadMoreClick() {
    const {taskId, currentPage, bugListFetch} = this.props;
    bugListFetch(taskId, currentPage);
  }

  render() {
    const {isFetching, bugList, isAuthenticated, taskId, projectId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;

    if (isFetching && currentPage === 1) {
      return (<Spinner/>);
    }

    return (
        <div>
            {isAuthenticated && <BugForm projectId={projectId} taskId={taskId}/>}
            
            <BugList bugList={bugList}/>
            {showLoadMore && <LoadMore label="Load more Bugs..."
                                    onClick={this.onLoadMoreClick.bind(this)}
                                    disabled={isFetching}/>}
            
        </div>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(BugListContainer);
