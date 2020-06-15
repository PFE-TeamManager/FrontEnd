import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";

export class BugList extends React.Component {
  render() {
    const {bugList} = this.props;

    if (null === bugList || 0 === bugList.length) {
      return (<Message message="No Bugs yet"/>);
    }

    return (
      <div className="card mb-3 mt-3 pt-2 pb-2 shadow-sm card-bug">
        {bugList.map( (bug,i) => {
        return (
            <div key={i} className="col-12">            
                <div className={"card text-white "+( bug.enabled ? "bg-warning-app" : "bg-info-app" )+" mb-3"} >
                <div className="card-header"> Bug N° {bug.id} </div>
                <div className="card-body border-bottom">
                    <h5 className="card-title">
                    <Link to={`/dashboard/bugs/${bug.id}`}> {bug.BugTitle} </Link>
                    </h5>
                    <p className="card-text mb-0"> {bug.BugDescription} </p>
                    <p className="card-text">
                    <small className="text-muted">
                        {timeago().format(bug.createdAt)} by&nbsp; {bug.createdBy.username}
                    </small>
                    </p>
                </div>
                </div>
            </div>
        );
        })}
      </div>
    )
  }
}
