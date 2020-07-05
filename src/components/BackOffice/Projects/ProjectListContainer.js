import React from 'react';
import ProjectList from "./ProjectList";
import ProjectListDev from "./ProjectListDev";
import {projectListFetch,projectListSetPage,teamListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import ProjectForm from './ProjectForm';
import { Paginator } from "../../Global/Paginator";
import {canCreateAuthorization} from "../../../redux/apiUtils";
import { ComponentTitle } from '../../Global/ComponentTitle';

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.teamList,// teamList est dans combineReducers dans reducer.js
  ...state.projectList// projectList est dans combineReducers dans reducer.js
});

const mapDispatchToProps = {
  projectListFetch,projectListSetPage,teamListFetch
};

class ProjectListContainer extends React.Component {

  componentDidMount() {
    this.props.projectListFetch(this.getQueryParamPage());
    this.props.teamListFetch();
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
    const {teams,projects,isFetching, currentPage, pageCount} = this.props;
    
    if (canCreateAuthorization(this.props.userData)) {

      if ( isFetching && currentPage === 1 ) {
        return (
          <div>
          <ComponentTitle icon="fa fa-product-hunt" title="Projects" introduction="Interafce Gestion de Projet" />
          <div className="row">
              <div className="col-12">
                <Spinner />
              </div>
          </div>
          </div>
        );
      }

      if ( isFetching && currentPage > 1 )  {
        return (
          <div>
            <ComponentTitle icon="fa fa-product-hunt" title="Projects" introduction="Interafce Gestion de Projet" />
            <div className="row">
                <div className="col-12 col-md-6">
                  <Spinner />
                </div>
                <div className="col-12 col-md-6">
                  <ProjectForm teams={teams} />
                </div>
            </div>
          </div>
        );
      }
      return (
        <div>
          <ComponentTitle icon="fa fa-product-hunt" title="Projects" introduction="Interafce Gestion de Projet" />
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
                <ProjectForm teams={teams} />
              </div>
          </div>
        </div>
      )
    } else {
      if ( isFetching ) {
        return (
          <div>
            <ComponentTitle icon="fa fa-product-hunt" title="Projects" introduction="Interafce Gestion de Projet" />
            <div className="row">
                <div className="col-12">
                  <Spinner />
                </div>
            </div>
          </div>
        );
      }
      return (
        <div>
          <ComponentTitle icon="fa fa-product-hunt" title="Projects" introduction="Interafce Gestion de Projet" />
          <div className="row">
            <div className="col-12">
                <ProjectListDev projects={projects}/>
                <Paginator  currentPage={currentPage} pageCount={pageCount}
                            setPage={this.changePage.bind(this)}
                            nextPage={this.onNextPageClick.bind(this)}
                            prevPage={this.onPrevPageClick.bind(this)}/>
            </div>
          </div>
        </div>
      )
    }

    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
