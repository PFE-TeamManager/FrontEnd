import React from 'react';
import {Message} from "../../Global/Message";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ActiveFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.active }/>
    );
  }
}
class MemberList extends React.Component {
  
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
      <BootstrapTable data={members} striped hover pagination version='4'>
        <TableHeaderColumn dataField='idMember' isKey>User ID</TableHeaderColumn>
        <TableHeaderColumn dataField='username'>User Name</TableHeaderColumn>
        <TableHeaderColumn dataField='email'>User Email</TableHeaderColumn>
        <TableHeaderColumn dataField='roles'>Roles</TableHeaderColumn>
        <TableHeaderColumn dataField='userenabled' dataFormat={activeFormatter}>Active</TableHeaderColumn>
        <TableHeaderColumn dataField='dateembauchement'>Date Embauchement</TableHeaderColumn>
      </BootstrapTable>
    </div>)
  }
}

export default MemberList;
