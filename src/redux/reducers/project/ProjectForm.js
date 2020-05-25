import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../form";
import {projectAdd} from "../../actions/actions";

const mapDispatchToProps = {
  projectAdd
};

class ProjectForm extends React.Component {
  onSubmit(values) {
    const {projectAdd} = this.props;
    return projectAdd(values.projectName);
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="projectName" label="Type your Project:"
                   type="textarea" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
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
