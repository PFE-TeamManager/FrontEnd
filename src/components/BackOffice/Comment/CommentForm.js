import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../../redux/form";
import {commentAddTask,commentAddBug} from "../../../redux/actions/actions";

const mapDispatchToProps = {
  commentAddTask,commentAddBug
};

class CommentForm extends React.Component {
  onSubmit(values) {

    const {commentAddTask, commentAddBug, taskId, bugId, reset} = this.props;
    if( taskId ){
      return commentAddTask(values.content, taskId).then(() => reset());
    }
    if( bugId ){
      return commentAddBug(values.content, bugId).then(() => reset());
    }
    
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="content" label="Type your comment:"
                   type="textarea" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Add Comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CommentForm'
})(connect(null, mapDispatchToProps)(CommentForm))
