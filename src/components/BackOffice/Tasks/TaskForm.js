import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../../redux/form";
import {taskAdd} from "../../../redux/actions/actions";

const mapDispatchToProps = {
  taskAdd
};

class TaskForm extends React.Component {
  onSubmit(values) {
    const {taskAdd, reset} = this.props;
    return taskAdd(values.taskTitle).then(
                                            () => reset()
                                          );
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="taskTitle" label="Type your task :"
                   type="text" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Add Task
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'TaskForm'
})(connect(null, mapDispatchToProps)(TaskForm))
