import React from 'react';
import {Message} from "../../Global/Message";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ActiveFormatter from './DatatableGlobal/ActiveFormatter';

class TeamList extends React.Component {

  render() {
    //The state is in the TeamListReducer
    const {teams} = this.props;

    if (null === teams || 0 === teams.length) {
      return (<Message message="No Teams available"/>);
    }

    function activeFormatter(cell, row) {
        return (
          <ActiveFormatter active={ cell } />
        );
    }

    return (
    <div className="card p-2">
        <BootstrapTable data={teams} striped hover pagination insertRow={ true } version='4'>
            <TableHeaderColumn dataField='idTeam' isKey>Team ID</TableHeaderColumn>
            <TableHeaderColumn dataField='teamName'>Team Name</TableHeaderColumn>
            <TableHeaderColumn dataField='teamenabled' dataFormat={activeFormatter}>Active</TableHeaderColumn>
            <TableHeaderColumn dataField='projectName'>Project</TableHeaderColumn>
        </BootstrapTable>
    </div>)
  }
}

export default TeamList;
