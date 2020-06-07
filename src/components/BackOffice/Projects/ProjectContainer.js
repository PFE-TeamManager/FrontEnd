import React from 'react';
import Project from "./Project";
import {projectFetch,projectUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import TaskListContainer from '../Tasks/TaskListContainer';

const mapStateToProps = state => ({
  ...state.project//combineReducers
});
//Dispatch Actions
const mapDispatchToProps = {
  projectFetch,projectUnload
};

class ProjectContainer extends React.Component {

  componentDidMount() {
    //pass the id by parameter
    this.props.projectFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.projectUnload();
  }

  render() {

    const {project,isFetching} = this.props;

    if (isFetching) {
      return (<Spinner />);
    }

    return (
      <div>
        <Project project={project}/>
        {project && <TaskListContainer projectId={this.props.match.params.id}/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
