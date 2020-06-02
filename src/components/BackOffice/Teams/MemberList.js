import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import {Message} from "../../Global/Message";

class ActiveFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.active }/>
    );
  }
}

class MemberList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activeTab: 2
    };
  }
  

  render() {
    //The state is in the TeamListReducer
    const {members} = this.props;

    if (null === members || 0 === members.length) {
      return (<Message message="No members available"/>);
    }

    function activeFormatter(cell, row) {
      return (
        <ActiveFormatter active={ cell } />
      );
    }
    
    return (
    <div className="card p-2">
      
        <Tabs defaultActiveKey="2" activeKey={this.state.key} onSelect={this.handleSelect} >
          <Tab eventKey={1} title="Equipe">DataTable Equipe</Tab>
          <Tab eventKey={2} title="Member">
            <BootstrapTable data={members} striped hover pagination version='4'>
              <TableHeaderColumn dataField='idMember' isKey>User ID</TableHeaderColumn>
              <TableHeaderColumn dataField='username'>User Name</TableHeaderColumn>
              <TableHeaderColumn dataField='email'>User Email</TableHeaderColumn>
              <TableHeaderColumn dataField='roles'>Roles</TableHeaderColumn>
              <TableHeaderColumn dataField='userenabled' dataFormat={activeFormatter}>Active</TableHeaderColumn>
              <TableHeaderColumn dataField='dateembauchement'>Date Embauchement</TableHeaderColumn>
            </BootstrapTable>
          </Tab>
        </Tabs>
    </div>)
  }
}

export default MemberList;
