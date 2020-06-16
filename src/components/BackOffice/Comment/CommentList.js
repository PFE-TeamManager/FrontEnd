import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Avatar from 'react-avatar';


export class CommentList extends React.Component {
  render() {
    const {commentList,userData} = this.props;

    if (null === commentList || 0 === commentList.length) {
      return (<Message message="No comments yet"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <TransitionGroup>
          {commentList.map(comment => {
            if ((userData.id === comment.createdBy.id)) {
              return (
                <CSSTransition key={comment.id} timeout={1000} classNames="fade">
                  <div className="card border-bottom">
                      <div className="card-body d-flex flex-row">
                        <div className="col-12 col-md-9">
                          <p className="card-text mb-0">
                            {comment.content}
                          </p>
                        </div>
                        <div className="col-12 col-md-3 text-center">
                            {/* <img  src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" 
                                className="rounded-circle" 
                                height="50px" width="50px" alt="avatar" /> */}
                            
                            <Avatar size="70" name={comment.createdBy.username} />
                            <h4 className="card-title font-weight-bold mb-2 mt-2">
                              {timeago().format(comment.createdAt)} { comment.createdBy ? "by "+comment.createdBy.username : ""}
                            </h4>
                        </div>
                      </div>
                  </div>
                </CSSTransition>
              );
            } else {
              return (
                <CSSTransition key={comment.id} timeout={1000} classNames="fade">
                  <div className="card border-bottom">
                      <div className="card-body d-flex flex-row">
                        <div className="col-12 col-md-3 text-center">
                            {/* <img  src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" 
                                className="rounded-circle" 
                                height="50px" width="50px" alt="avatar" /> */}
                            
                            <Avatar size="70" name={comment.createdBy.username} />
                            <h4 className="card-title font-weight-bold mb-2 mt-2">
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
            }
          })}
        </TransitionGroup>
      </div>
    )
  }
}
