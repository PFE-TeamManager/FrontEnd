import React from 'react';
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Message} from "../../Global/Message";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ActiveFormatter from './DatatableGlobal/ActiveFormatter';
import {memberPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal)

const mapDispatchToProps = {
  memberPATCH
};

function onAfterSaveCell(row, cellName, cellValue) {
  MyReactSwal.fire({
    icon: 'success',
    title: 'Successful Modification'
  })
}

function onBeforeSaveCell(row, cellName, cellValue) {
  //call the redux action and pass the id of member and value of change
  if( cellValue == "Développeur" ){
    return memberPATCH('ROLE_MEMBRE','ROLE_DEV', row["idMember"]);
  }else{
    return memberPATCH('ROLE_MEMBRE','null', row["idMember"]);
  }
}
class MemberList extends React.Component {

  render() {
    //The state is in the TeamListReducer
    const {members} = this.props;

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: onAfterSaveCell  // a hook for after saving cell
    };

    const roles = ["Membre","Développeur"];

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
      <BootstrapTable version='4' data={members} 
                      striped hover pagination 
                      cellEdit={ cellEditProp }>
          <TableHeaderColumn dataField='idMember' isKey={ true }>User ID</TableHeaderColumn>
          <TableHeaderColumn dataField='username' editable={ false }>User Name</TableHeaderColumn>
          <TableHeaderColumn dataField='email' editable={ false }>User Email</TableHeaderColumn>
          <TableHeaderColumn  dataField='roles' 
                              editable={ { type: 'select', options: { values: roles } } }> 
                                Roles
          </TableHeaderColumn>
          <TableHeaderColumn  dataField='userenabled' 
                              dataFormat={activeFormatter}>Active</TableHeaderColumn>
          <TableHeaderColumn  dataField='dateembauchement' 
                              editable={ false }>Date Embauchement</TableHeaderColumn>
      </BootstrapTable>
    </div>)
  }
}

export default connect(null, mapDispatchToProps)(MemberList);
