import React from 'react';
import MemberList from "./MemberList";
import TeamList from "./TeamList";
import {memberListFetch,teamListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {canCreateAuthorization} from "../../../redux/apiUtils";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import { ComponentTitle } from '../../Global/ComponentTitle';

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.teamList,
  ...state.memberList// memberList est dans combineReducers dans reducer.js
});

const mapDispatchToProps = {
  memberListFetch,teamListFetch
};

class MemberListContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activeTab: 2
    };
  }

  componentDidMount() {
    this.props.memberListFetch();
    this.props.teamListFetch();
  }

  render() {

    const {members,teams,isFetching} = this.props;

    
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
        <div>
          <ComponentTitle 
          icon="fa fa-users"
          title="Teams & Members" 
          introduction="Interafce Gestion des équipes et ses membres" />
          <div className="row">
              <div className="col-12">
                <Tabs defaultActiveKey="2" activeKey={this.state.key} onSelect={this.handleSelect} >
                  <Tab eventKey={1} title="Team">
                      <TeamList teams={teams}/>
                  </Tab>
                  <Tab eventKey={2} title="Member">
                      <MemberList members={members} teams={teams}/>
                  </Tab>
                </Tabs>
              </div>
          </div>
        </div>
      )

    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListContainer);
