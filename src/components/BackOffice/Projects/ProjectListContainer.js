import React from 'react';
import ProjectList from "./ProjectList";
import {projectListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import ProjectForm from './ProjectForm';

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
      <div className="row">
          <div className="col-12 col-md-6">
            <ProjectList projects={projects}/>
          </div>
          <div className="col-12 col-md-6">
            {/* here must be check of the role chef projet */}
            <ProjectForm />
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
