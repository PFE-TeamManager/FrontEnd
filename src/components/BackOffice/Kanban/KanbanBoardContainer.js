import React from 'react';
import {myTasksListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import KanbanBoard from './KanbanBoard';
import { TaskCards } from './TaskCards';
import "./css/kanban.css";

const mapeStateToProps = state => ({
  userData: state.auth.userData,
  ...state.tasksToDoList
});

const mapDispatchToProps = {
    myTasksListFetch
};

class KanbanBoardContainer extends React.Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.myTasksListFetch(this.props.userData.id);
    }

    render() {
        const {isFetching, tasksToDoList} = this.props;
        //console.log(tasksToDoList);
        if (isFetching) {
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
                <div className="mb-3 mt-3 shadow-sm">
                    <div className="card mb-3">
                        <div className="card-body border-bottom">
                            I imagined a system of trophies to display always to the dev , en slide
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <main className="flexbox">
                    {/** Get The Tasks To do */}
                    <KanbanBoard id="board-to-do" className="board" databackgroundColor="#98FB98">
                        {
                            tasksToDoList 
                            && tasksToDoList.map( 
                            (task,i) => {
                                if( task.ToDo ){
                                    return (
                                        <TaskCards  key={i} id={"card-"+task.id} 
                                                    dataid={task.id} datasource="board-to-do"
                                                    backgroundColor="#98FB98"
                                                    className="card" draggable="true">
                                                    <p>{task.TaskTitle}</p>
                                        </TaskCards>
                                    );
                                }
                            })
                        }
                    </KanbanBoard>

                    <KanbanBoard id="board-doing" className="board" databackgroundColor="#3CB371">
                        {
                            tasksToDoList 
                            && tasksToDoList.map( 
                            (task,i) => {
                                if( task.doing ){
                                    return (
                                        <TaskCards  key={i} id={"card-"+task.id} 
                                                    dataid={task.id} datasource="board-doing"
                                                    backgroundColor="#3CB371"
                                                    className="card" draggable="true">
                                                    <p>{task.TaskTitle}</p>
                                        </TaskCards>
                                    );
                                }
                            })
                        }
                    </KanbanBoard>

                    <KanbanBoard id="board-done" className="board" databackgroundColor="#6B8E23">
                        {
                            tasksToDoList 
                            && tasksToDoList.map( 
                            (task,i) => {
                                if( task.done ){
                                    return (
                                        <TaskCards  key={i} id={"card-"+task.id} 
                                                    dataid={task.id} datasource="board-done"
                                                    backgroundColor="#6B8E23"
                                                    className="card" draggable="true">
                                                    <p>{task.TaskTitle}</p>
                                        </TaskCards>
                                    );
                                }
                            })
                        }
                    </KanbanBoard>
                </main>
            </div>
        </div>
        )
    }
}
export default connect(mapeStateToProps, mapDispatchToProps)(KanbanBoardContainer);