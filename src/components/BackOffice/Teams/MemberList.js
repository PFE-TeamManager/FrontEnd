import React from 'react';
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import {Message} from "../../Global/Message";
import {TransitionGroup, CSSTransition} from "react-transition-group";

class MemberList extends React.Component {

  render() {
    //The state is in the TeamListReducer
    const {members} = this.props;

    if (null === members || 0 === members.length) {
      return (<Message message="No members available"/>);
    }

    return (
    <div>
      <TransitionGroup>
        {members && members.map(member => (
            <CSSTransition classNames="fade" key={member.idMember} timeout={1000}>
              <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                  <h3>
                    <Link to={`/dashboard/teams/${member.idMember}`}>{member.username}</Link>
                  </h3>
                  <p className="card-text bordet-top">
                    <small className="text-muted">
                      {timeago().format(member.createdAt)}
                    </small>
                  </p>
                </div>
              </div>
            </CSSTransition>
        ))}
      </TransitionGroup>
    </div>)
  }
}

export default MemberList;
