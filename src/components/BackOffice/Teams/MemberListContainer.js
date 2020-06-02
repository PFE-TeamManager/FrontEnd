import React from 'react';
import MemberList from "./MemberList";
import {memberListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {canCreateAuthorization} from "../../../redux/apiUtils";

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.memberList// memberList est dans combineReducers dans reducer.js
});

const mapDispatchToProps = {
  memberListFetch
};

class MemberListContainer extends React.Component {

  componentDidMount() {
    this.props.memberListFetch();
  }

  render() {

    const {members,isFetching} = this.props;
    if (canCreateAuthorization(this.props.userData)) {    
      
      if ( isFetching ) {
        return (
          <div className="row">
              <div className="col-12">
                <Spinner />
              </div>
          </div>
        );
      }

      return (
        <div className="row">
            <div className="col-12">
              <MemberList members={members}/>
            </div>
        </div>
      )

    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListContainer);
