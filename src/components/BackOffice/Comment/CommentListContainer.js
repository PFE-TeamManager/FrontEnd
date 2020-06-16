import React from 'react';
import {commentListFetchTask,commentListFetchBug, commentListUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {CommentList} from "./CommentList";
import CommentForm from "./CommentForm";
import {LoadMore} from "../../Global/LoadMore";

const mapeStateToProps = state => ({
  ...state.commentList,
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData
});

const mapDispatchToProps = {
  commentListFetchTask,commentListFetchBug,
  commentListUnload
};

class CommentListContainer extends React.Component {
  componentDidMount() {
    if( this.props.taskId ){
      this.props.commentListFetchTask(this.props.taskId);
    }
    if( this.props.bugId ){
      this.props.commentListFetchBug(this.props.bugId);
    }
  }

  componentWillUnmount() {
    this.props.commentListUnload();
  }

  onLoadMoreClick() {
    const {taskId, bugId, currentPage, commentListFetchTask, commentListFetchBug} = this.props;
    if( taskId ){
      commentListFetchTask(taskId, currentPage);
    }

    if( bugId ){
      commentListFetchBug(bugId, currentPage);
    }
    
  }

  render() {
    const {isFetching, commentList, isAuthenticated, taskId, bugId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;

    if (isFetching && currentPage === 1) {
      return (<Spinner/>);
    }

    return (
      <div>
        <CommentList userData={this.props.userData} commentList={commentList}/>
        {showLoadMore && <LoadMore label="Load more comments..."
                                   onClick={this.onLoadMoreClick.bind(this)}
                                   disabled={isFetching}/>}
        {isAuthenticated && taskId && <CommentForm taskId={taskId}/>}
        {isAuthenticated && bugId && <CommentForm bugId={bugId}/>}
      </div>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(CommentListContainer);
