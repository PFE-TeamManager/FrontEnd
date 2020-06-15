import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../../redux/form";
import {bugAdd} from "../../../redux/actions/actions";

const mapDispatchToProps = {
  bugAdd
};

class BugForm extends React.Component {

  constructor(props) {
    super(props);
  }

  onSubmit(values) {
    const {bugAdd, taskId, reset} = this.props;
    return bugAdd(values, taskId).then(() => reset());
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="BugTitle" label="Type your bug Title :"
                   type="text" component={renderField}/>
            <Field name="BugDescription" label="Type your bug Description :"
                   type="textarea" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Add Bug
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'BugForm'
})(connect(null, mapDispatchToProps)(BugForm))
