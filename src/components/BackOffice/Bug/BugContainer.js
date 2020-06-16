import React from 'react';
import Bug from "./Bug";
import {bugFetch,bugUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import CommentListContainer from '../Comment/CommentListContainer';

const mapStateToProps = state => ({
  ...state.bug
});
//Dispatch Actions
const mapDispatchToProps = {
  bugFetch,bugUnload
};

class BugContainer extends React.Component {

  componentDidMount() {
    //pass the id by parameter
    this.props.bugFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.bugUnload();
  }

  render() {

    const {bug,isFetching} = this.props;

    if (isFetching) {
      return (<Spinner />);
    }

    return (
      <div className="row">
        <div className="col-12">
            <Bug singleBug={bug}/>
            {bug && <CommentListContainer bugId={this.props.match.params.id}/>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BugContainer);
