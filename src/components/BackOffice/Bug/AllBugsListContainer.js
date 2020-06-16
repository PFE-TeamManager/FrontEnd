import React from 'react';
import {allBugsListFetch,allBugsListSetPage} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import { Paginator } from "../../Global/Paginator";
import BugListDEV from './BugListDEV';
import { ComponentTitle } from '../../Global/ComponentTitle';

const mapeStateToProps = state => ({
  userData: state.auth.userData,
  ...state.allBugsListReducer
});

const mapDispatchToProps = {
    allBugsListFetch,allBugsListSetPage
};

class AllBugsListContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            all: true
        };
    }

    componentDidMount() {
        if( this.props.userData.teams ){
            this.props.allBugsListFetch(this.props.userData.teams.project.id,this.getQueryParamPage());
        } else {
            this.props.allBugsListFetch(null,this.getQueryParamPage());
        }
    }
    
    componentDidUpdate(prevProps) {
        const {currentPage, allBugsListFetch, allBugsListSetPage} = this.props;

        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            allBugsListSetPage(this.getQueryParamPage());
        }

        if (prevProps.currentPage !== currentPage) {
            if( this.props.userData.teams ){
                this.props.allBugsListFetch(this.props.userData.teams.project.id,currentPage);
            } else {
                this.props.allBugsListFetch(null,currentPage);
            }
        }
    }
    
    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page) {
        const {history, allBugsListSetPage} = this.props;
        allBugsListSetPage(page);
        history.push(`/dashboard/allbugs/page/${page}`);
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
        const {isFetching, allBugsListReducer, currentPage, pageCount} = this.props;

        if (isFetching && currentPage === 1) {
            return (
                <div className="row">
                    <div className="col-12">
                      <Spinner />
                    </div>
                </div>
            );
        }

        return (
        <div>
          <ComponentTitle   icon="fa fa-bug" title="Team's Bugs" 
                            introduction="Bugs of My Team" />
            <div className="row">
                <div className="col-12">
                    <BugListDEV bugList={allBugsListReducer} />
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

export default connect(mapeStateToProps, mapDispatchToProps)(AllBugsListContainer);
