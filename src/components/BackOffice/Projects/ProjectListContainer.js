import React from 'react';
import ProjectList from "./ProjectList";
import {projectListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";

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

    const {projects} = this.props;

    return (
      <div>
        <ProjectList projects={projects}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
