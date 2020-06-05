import React from 'react';
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Message} from "../../Global/Message";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {teamPATCHActivity} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal)

const mapDispatchToProps = {
  teamPATCHActivity
};

function onAfterSaveCell(row, cellName, cellValue) {
  MyReactSwal.fire({
    icon: 'success'
  })
}

function onBeforeSaveCell(row, cellName, cellValue) {
  teamPATCHActivity(row["idTeam"]);
}

class TeamList extends React.Component {

  render() {
    //The state is in the TeamListReducer
    const {teams} = this.props;

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: onAfterSaveCell  // a hook for after saving cell
    };

    if (null === teams || 0 === teams.length) {
      return (<Message message="No Teams available"/>);
    }

    return (
    <div className="card p-2">
        <BootstrapTable data={teams} striped hover pagination 
                        insertRow={ true } cellEdit={ cellEditProp } version='4'>
            <TableHeaderColumn dataField='idTeam' isKey={ true } editable={ false }>Team ID</TableHeaderColumn>
            <TableHeaderColumn dataField='teamName'>Team Name</TableHeaderColumn>
            <TableHeaderColumn  dataField='teamenabled'
                                editable={ { type: 'checkbox', options: { values: 'Active:Non Active' } } } 
                                >Active</TableHeaderColumn>
            <TableHeaderColumn dataField='projectName' editable={ false }>Project</TableHeaderColumn>
        </BootstrapTable>
    </div>)
  }
}

export default connect(null, mapDispatchToProps)(TeamList);
