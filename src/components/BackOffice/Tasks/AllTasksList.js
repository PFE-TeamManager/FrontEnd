import React from 'react';
import {allTasksListFetch,taskListUnload} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import {LoadMore} from "../../Global/LoadMore";
import { TaskListDEV } from './TaskListDEV';

const mapeStateToProps = state => ({
  ...state.taskList,
  userData: state.auth.userData
});

const mapDispatchToProps = {
    allTasksListFetch,taskListUnload
};

class AllTasksList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            all: true
        };
    }

    componentDidMount() {
        this.props.allTasksListFetch();
    }

    componentWillUnmount() {
        this.props.taskListUnload();
    }

    onLoadMoreClick() {
        const {currentPage, allTasksListFetch} = this.props;
        allTasksListFetch(currentPage);
    }

    render() {
        const {isFetching, taskList, currentPage, pageCount} = this.props;
        const showLoadMore = pageCount > 1 && currentPage <= pageCount;

        if (isFetching && currentPage === 1) {
        return (<Spinner/>);
        }

        return (
        <div className="row">
            <div className="col-12">
                <TaskListDEV all={this.state.all} taskList={taskList}/>
                {showLoadMore && <LoadMore label="Load more Tasks..."
                                        onClick={this.onLoadMoreClick.bind(this)}
                                        disabled={isFetching}/>}
            </div>
        </div>
        )
    }
}

export default connect(mapeStateToProps, mapDispatchToProps)(AllTasksList);
