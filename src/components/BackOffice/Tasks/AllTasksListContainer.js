import React from 'react';
import {allTasksListFetch,allTasksListSetPage} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import { Paginator } from "../../Global/Paginator";
import { TaskListDEV } from './TaskListDEV';

const mapeStateToProps = state => ({
  userData: state.auth.userData,
  ...state.allTasksListReducer
});

const mapDispatchToProps = {
    allTasksListFetch,allTasksListSetPage
};

class AllTasksListContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            all: true
        };
    }

    componentDidMount() {
        this.props.allTasksListFetch(this.getQueryParamPage());
    }
    
    componentDidUpdate(prevProps) {
        const {currentPage, allTasksListFetch, allTasksListSetPage} = this.props;

        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            allTasksListSetPage(this.getQueryParamPage());
        }

        if (prevProps.currentPage !== currentPage) {
            allTasksListFetch(currentPage);
        }
    }
    
    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page) {
        const {history, allTasksListSetPage} = this.props;
        allTasksListSetPage(page);
        history.push(`/dashboard/alltasks/page/${page}`);
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
        const {isFetching, allTasksListReducer, currentPage, pageCount} = this.props;

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
        <div className="row">
            <div className="col-12">
                <TaskListDEV taskList={allTasksListReducer} userData={this.props.userData}/>
                <Paginator  currentPage={currentPage} pageCount={pageCount}
                            setPage={this.changePage.bind(this)}
                            nextPage={this.onNextPageClick.bind(this)}
                            prevPage={this.onPrevPageClick.bind(this)}/>
            </div>
        </div>
        )
    }
}

export default connect(mapeStateToProps, mapDispatchToProps)(AllTasksListContainer);
