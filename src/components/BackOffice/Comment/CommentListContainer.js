import React from 'react';
import {commentListFetch, commentListUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {CommentList} from "./CommentList";
import CommentForm from "./CommentForm";
import {LoadMore} from "../../Global/LoadMore";

const mapeStateToProps = state => ({
  ...state.commentList,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  commentListFetch,
  commentListUnload
};

class CommentListContainer extends React.Component {
  componentDidMount() {
    this.props.commentListFetch(this.props.taskId);
  }

  componentWillUnmount() {
    this.props.commentListUnload();
  }

  onLoadMoreClick() {
    const {taskId, currentPage, commentListFetch} = this.props;
    commentListFetch(taskId, currentPage);
  }

  render() {
    const {isFetching, commentList, isAuthenticated, taskId, currentPage, pageCount} = this.props;
    const showLoadMore = pageCount > 1 && currentPage <= pageCount;

    if (isFetching && currentPage === 1) {
      return (<Spinner/>);
    }

    return (
      <div>
        <CommentList commentList={commentList}/>
        {showLoadMore && <LoadMore label="Load more comments..."
                                   onClick={this.onLoadMoreClick.bind(this)}
                                   disabled={isFetching}/>}
        {isAuthenticated && <CommentForm taskId={taskId}/>}
      </div>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(CommentListContainer);
