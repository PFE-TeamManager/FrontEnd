import React from 'react';
import ProjectList from "./ProjectList";
import {projectListFetch,projectListSetPage} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import ProjectForm from './ProjectForm';
import { Paginator } from "../../Global/Paginator";

const mapStateToProps = state => ({
  ...state.projectList
});

const mapDispatchToProps = {
  projectListFetch,projectListSetPage
};

class ProjectListContainer extends React.Component {

  componentDidMount() {
    this.props.projectListFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, projectListFetch, projectListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      projectListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      projectListFetch(currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage(page) {
    const {history, projectListSetPage} = this.props;
    projectListSetPage(page);
    history.push(`/dashboard/projects/page/${page}`);
  }

  onNextPageClick(e) {
    const {currentPage, pageCount} = this.props;
    const newPage = Math.min(currentPage + 1, pageCount);
    this.changePage(newPage);
  }

  onPrevPageClick(e) {
    const {currentPage} = this.props;
    const newPage = Math.max(currentPage - 1, 1);
    this.changePage(newPage);
  }

  render() {

    const {projects,isFetching, currentPage, pageCount} = this.props;

    if (isFetching) {
      return (
        <div className="row">
            <div className="col-12 col-md-6">
              <Spinner />
            </div>
            <div className="col-12 col-md-6">
              <ProjectForm />
            </div>
        </div>
      );
    }

    return (
      <div className="row">
          <div className="col-12 col-md-6">
            <ProjectList projects={projects}/>
            <Paginator  currentPage={currentPage} pageCount={pageCount}
                        setPage={this.changePage.bind(this)}
                        nextPage={this.onNextPageClick.bind(this)}
                        prevPage={this.onPrevPageClick.bind(this)}/>
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
