import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField,selectRenderField} from "../../../redux/form";
import {projectAdd} from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal);

const mapDispatchToProps = {
  projectAdd
};

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      team: ''
    };
  }

  onSubmit(values) {
    const {projectAdd, reset} = this.props;
    if( this.state.team ){
      return projectAdd(values.projectName,this.state.team).then(() => reset());
    }else{
      MyReactSwal.fire({
        icon: 'error',
        title: 'Team Missing...',
      })
    }
    
  }


  render() {
    const {teams,handleSubmit, submitting} = this.props;
    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name="projectName" label="Type your Project :"
                    type="text" component={renderField}/>

                <select name="team" className="form-control" 
                        onChange={(e) => this.setState({ team: e.target.value })}>
                    <option>Choose your team</option>
                    {
                      teams && teams.map( (team,i) => {
                          if( (team.idProject === null) && (team.teamenabled == "Active") ){
                            return <option key={i} value={team.idTeam}>{team.teamName}</option>
                          }
                        }
                      ) 
                    }
                </select>
              
              <button type="submit" className="btn btn-primary btn-big btn-block "
                      disabled={submitting}>
                Add Project
              </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ProjectForm'
})(connect(null, mapDispatchToProps)(ProjectForm))
