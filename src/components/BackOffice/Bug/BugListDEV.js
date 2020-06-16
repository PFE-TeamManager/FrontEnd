import React from 'react';
import {Message} from "../../Global/Message";
import timeago from 'timeago.js';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {connect} from "react-redux";
import {affectDEVTobugPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal)

const mapStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = {
  affectDEVTobugPATCH
};

class BugListDEV extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      affectedBugId: [],
      bugAffectedTo : ''
    }
  }

  affectToUser = (bugId) => {
    this.setState({
      affectedBugId: [...this.state.affectedBugId, bugId],
      bugAffectedTo: "Bug Affected To "+this.props.userData.username
    });
    MyReactSwal.fire({
      icon: 'success'
    });
    affectDEVTobugPATCH(bugId,this.props.userData.id);
  }

  handleAffectation = (bugUser,bugId) => {
    if( ((this.state.bugAffectedTo == "") && bugUser && bugUser.id) || ((this.state.bugAffectedTo) && bugUser && bugUser.id) ){
      return (<p className="card-text" > Bug Affected To Member {bugUser.username} </p>)
    } else if( (this.state.bugAffectedTo) && ( this.state.affectedBugId.some(item => bugId === item) ) ) {
      return (
        <p className="card-text">
          {this.state.bugAffectedTo}
        </p>
      )
    } else {
      return (
        <p className="card-text">
          <button className="btn btn-primary" onClick={ () => { this.affectToUser(bugId) } } >
            Choose The Bug
          </button>
        </p>
      )
    }
  }

  render() {
    const {bugList} = this.props;

    if (null === bugList || 0 === bugList.length) {
      return (<Message message="No Bugs yet"/>);
    }
    
    return (
      <div className="mb-3 mt-3 card-bug">
          <div className="row">
            {bugList && bugList.map( bug => {
                return (
                    <div key={bug.id} className="col-12 col-md-6">
                        <div className={"card text-white "+( bug.enabled ? "bg-success-app" : "bg-danger-app" )+" mb-3"} >
                        <div className="card-header"> Tache N° {bug.id} - Project N° {bug.IdProject.id} - {bug.IdProject.projectName} </div>
                        <div className="card-body border-bottom">
                            <h5 className="card-title">
                            <Link to={`/dashboard/bugs/${bug.id}`}> {bug.BugTitle} </Link>
                            </h5>
                            <p className="card-text mb-0"> {bug.BugDescription} </p>
                            <p className="card-text">
                              <small className="text-white">
                                  {timeago().format(bug.createdAt)} by&nbsp; {bug.createdBy.username}
                              </small>
                            </p>
                            { this.handleAffectation(bug.user,bug.id) }
                        </div>
                        </div>
                    </div>
                );
            })}
          </div>
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BugListDEV);