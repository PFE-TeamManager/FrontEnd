import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import Select from 'react-select';
import {renderField} from "../../../redux/form";
import {taskAdd} from "../../../redux/actions/actions";

const mapDispatchToProps = {
  taskAdd
};

class TaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: null
    };
  }

  onSubmit(values) {
    const {taskAdd, projectId, reset} = this.props;
    let labels = [];
    { this.state.selectedLabel && this.state.selectedLabel.map( 
        item => { 
          labels.push(`/api/labels/`+item.value);
        }
      ) 
    }
    return taskAdd(values, projectId,labels).then(() => reset());
  }

  handleChange = (selectedLabel) => {
    this.setState({ selectedLabel });
  }

  render() {
    const {labelList, handleSubmit, submitting} = this.props;
    const options = [];

    { labelList && labelList.map( 
        (label,i) => {
          if( (label.enabled === true) ){
            options.push({
              value: label.id,
              label: label.labelName
            });
          }
        }
      ) 
    } 

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="TaskTitle" label="Type your task Title :"
                   type="text" component={renderField}/>
            <Field name="TaskDescription" label="Type your task Description :"
                   type="textarea" component={renderField}/>
            <div className="form-group">
              <Select name="label" isMulti
                      onChange={this.handleChange}
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select" />
            </div>
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
