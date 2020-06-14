import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {TransitionGroup, CSSTransition} from "react-transition-group";


export class CommentList extends React.Component {
  render() {
    const {commentList} = this.props;

    if (null === commentList || 0 === commentList.length) {
      return (<Message message="No comments yet"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <TransitionGroup>
          {commentList.map(comment => {
            return (
              <CSSTransition key={comment.id} timeout={1000} classNames="fade">
                <div class="card border-bottom">
                    <div className="card-body d-flex flex-row">
                      <div className="col-12 col-md-3 text-center">
                          <img  src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" 
                              class="rounded-circle" 
                              height="50px" width="50px" alt="avatar" />
                          <h4 class="card-title font-weight-bold mb-2 mt-2">
                            {timeago().format(comment.createdAt)} { comment.createdBy ? "by "+comment.createdBy.username : ""}
                          </h4>
                      </div>
                      <div className="col-12 col-md-9">
                        <p className="card-text mb-0">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    )
  }
}
