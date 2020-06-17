import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../../../redux/form";
import {userPATCH} from "../../../../redux/actions/actions";

const mapStateToProps = state => ({
    userData: state.auth.userData
});

const mapDispatchToProps = {
    userPATCH
};

class InfoProfileForm extends React.Component {
  
  constructor(props) {
    super(props);
  }

  onSubmit(values) {
    const {userPATCH} = this.props;
    if( values.description ){
      userPATCH(values.description,this.props.userData.id);
    }
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-header">
          This form will disappear after you fill your description
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="description" label="Type your description"
                   type="textarea" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Add Description
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'InfoProfileForm'
})(connect(mapStateToProps, mapDispatchToProps)(InfoProfileForm))
