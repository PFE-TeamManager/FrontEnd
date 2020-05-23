import React from 'react';
import ProjectList from "./ProjectList";
import {projectListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';

const mapStateToProps = state => ({
  ...state.projectList
});

const mapDispatchToProps = {
  projectListFetch
};

class ProjectListContainer extends React.Component {

  componentDidMount() {
    this.props.projectListFetch();
  }

  render() {

    const {projects,isFetching} = this.props;

    if (isFetching) {
      return (<Spinner />);
    }

    return (
      <div>
        <ProjectList projects={projects}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
