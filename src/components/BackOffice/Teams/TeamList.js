import React from 'react';
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Message} from "../../Global/Message";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {teamPATCHActivity,teamAdd,teamPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal);

const mapDispatchToProps = {
  teamPATCHActivity,teamAdd,teamPATCH
};

function onAfterSaveCell(row, cellName, cellValue) {
  MyReactSwal.fire({
    icon: 'success',
    title:"Modification équipe réussi"
  })
}

function onBeforeSaveCell(row, cellName, cellValue) {

  if( cellName == "teamName" ){
    teamPATCH(row["idTeam"],cellValue);
  }

  if( cellName == "teamenabled" ){
    if( cellValue == "Active" ){
      teamPATCHActivity(row["idTeam"],true);
    }
    if( cellValue == "Non Active" ){
      teamPATCHActivity(row["idTeam"],false);
    }
  }
  
}

function onAfterInsertRow(row) {

  for (const prop in row) {
    if( prop == "teamName" ){
      MyReactSwal.fire({
        icon: 'success',
        title:"Ajout équipe réussi"
      })
      return teamAdd(row[prop]);
    }
  }

}

function createCustomModalHeader(onClose, onSave) {
  const headerStyle = {
    fontWeight: 'bold',
    fontSize: 'large',
    textAlign: 'center',
    backgroundColor: '#eeeeee'
  };
  return (
    <div className='modal-header' style={ headerStyle }>
      <h3>Add Team</h3>
    </div>
  );
}

class TeamList extends React.Component {

  render() {
    //The state is in the TeamListReducer
    const {teams} = this.props;

    const options = {
      searchDelayTime: 1500,
      insertText: 'New Team',
      insertModalHeader: createCustomModalHeader,
      afterInsertRow: onAfterInsertRow// A hook for after insert rows
    };

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: onAfterSaveCell  // a hook for after saving cell
    };

    // if (null === teams || 0 === teams.length) {
    //   return (<Message message="No Teams available"/>);
    // }

    return (
    <div className="card p-2">
        <BootstrapTable version='4' striped hover pagination searchPlaceholder='Search...'
                        data={teams} cellEdit={ cellEditProp } options={ options }
                        insertRow={ true } search={ true }  >
            <TableHeaderColumn  dataField='idTeam' isKey={ true } autoValue={ true }
                                editable={ false } searchable={ false } >Team ID</TableHeaderColumn>
            <TableHeaderColumn dataField='teamName'>Team Name</TableHeaderColumn>
            <TableHeaderColumn  dataField='teamenabled' searchable={ false }
                                autoValue={ true }
                                editable={ { type: 'checkbox', options: { values: 'Active:Non Active' } } }>
                                Active</TableHeaderColumn>
            <TableHeaderColumn  dataField='projectName' 
                                editable={ false } autoValue={ true }>Project</TableHeaderColumn>
        </BootstrapTable>
    </div>)
  }
}

export default connect(null, mapDispatchToProps)(TeamList);
