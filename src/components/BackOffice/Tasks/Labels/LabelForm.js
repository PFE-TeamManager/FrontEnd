import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../../../redux/form";
import {labelAdd} from "../../../../redux/actions/actions";

const mapDispatchToProps = {
  labelAdd
};

class LabelForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    };
  }

  onSubmit(values) {
    const {labelAdd,reset} = this.props;
    // if( this.state.color ){
    //   return labelAdd(values, this.state.color ).then(() => reset());
    // }
    return labelAdd(values, "b35858" ).then(() => reset());
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="LabelName" label="Type your new Label"
                   type="text" component={renderField}/>
            {/* <div className="form-group">
              <label htmlFor="background-color">Choose a color for the new task :</label>
              <input  id="background-color" type="color" 
                      name="ColorLabel" 
                      onChange={(e) => this.setState({ color: e.target.value.substring(1) })} />
            </div> */}
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Add Label
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LabelForm'
})(connect(null, mapDispatchToProps)(LabelForm))
