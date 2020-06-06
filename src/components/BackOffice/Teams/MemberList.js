import React from 'react';
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Message} from "../../Global/Message";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {memberPATCH,memberTeamPATCH} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal)

const mapDispatchToProps = {
  memberPATCH,memberTeamPATCH
};

function onAfterSaveCell(row, cellName, cellValue) {
  MyReactSwal.fire({
    icon: 'success'
  })
}

function onBeforeSaveCell(row, cellName, cellValue) {
  //call the redux action and pass the id of member and value of change
  if( cellValue == "Développeur" ){
    return memberPATCH('ROLE_MEMBRE','ROLE_DEV', row["idMember"]);
  }else if( cellValue == "Membre" ){
    return memberPATCH('ROLE_MEMBRE','null', row["idMember"]);
  }else {
    let teamId = cellValue.charAt(0);
    return memberTeamPATCH(row["idMember"],teamId);
  }
}
class MemberList extends React.Component {

  render() {
    //The state is in the TeamListReducer
    const {members,teams} = this.props;
    const teamsArray = [];

    { teams && teams.map(
      (team) => {
        teamsArray.push(team.idTeam+" - "+team.teamName)
      }
    )}

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
    
    return (
    <div className="card p-2">
      <BootstrapTable version='4' data={members} 
                      striped hover pagination search={ true }
                      cellEdit={ cellEditProp }>
          <TableHeaderColumn  dataField='idMember' isKey={ true } 
                              editable={ false } searchable={ false }>User ID</TableHeaderColumn>
          <TableHeaderColumn dataField='username' editable={ false }>User Name</TableHeaderColumn>
          <TableHeaderColumn dataField='email' editable={ false }>User Email</TableHeaderColumn>
          <TableHeaderColumn  dataField='roles' 
                              editable={ { type: 'select', options: { values: roles } } }> 
                                Roles
          </TableHeaderColumn>
          <TableHeaderColumn  dataField='dateembauchement' 
                              editable={ false }>Date Embauchement</TableHeaderColumn>
          <TableHeaderColumn  dataField='teamName' 
                              editable={ { type: 'select', options: { values: teamsArray } } }>Equipe</TableHeaderColumn>
      </BootstrapTable>
    </div>)
  }
}

export default connect(null, mapDispatchToProps)(MemberList);
