import React from 'react';
import {myTasksListFetch,myBugsListFetch} from "../../../redux/actions/actions";
import {connect} from "react-redux";
import { Spinner } from '../../Global/Spinner';
import KanbanBoard from './KanbanBoard';
import { TaskCards } from './TaskCards';
import { BugCards } from './BugCards';
import { ComponentTitle } from '../../Global/ComponentTitle';
import "./css/kanban.css";

const mapeStateToProps = state => ({
  userData: state.auth.userData,
  ...state.tasksToDoList,
  ...state.bugsToDoList
});

const mapDispatchToProps = {
    myTasksListFetch,myBugsListFetch
};

class KanbanBoardContainer extends React.Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.myTasksListFetch(this.props.userData.id);
        this.props.myBugsListFetch(this.props.userData.id);
    }

    render() {
        const {isFetching, tasksToDoList, bugsToDoList} = this.props;
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
        <div>
          <ComponentTitle   icon="fa fa-tasks" title="My Board" 
                            introduction="Board of Tasks & Bugs" />
          
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
                                if( task.ToDo && task.enabled ){
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

                        {
                            bugsToDoList 
                            && bugsToDoList.map( 
                            (bug,i) => {
                                if( bug.ToDo && bug.enabled ){
                                    return (
                                        <BugCards  key={i} id={"card-"+bug.id} 
                                                    dataid={bug.id} datasource="board-to-do"
                                                    backgroundColor="#98FB98"
                                                    className="card" draggable="true">
                                                    <p>{bug.BugTitle}</p>
                                        </BugCards>
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
                                if( task.doing && task.enabled ){
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

                        {
                            bugsToDoList 
                            && bugsToDoList.map( 
                            (bug,i) => {
                                if( bug.doing && bug.enabled ){
                                    return (
                                        <BugCards  key={i} id={"card-"+bug.id} 
                                                    dataid={bug.id} datasource="board-to-do"
                                                    backgroundColor="#98FB98"
                                                    className="card" draggable="true">
                                                    <p>{bug.BugTitle}</p>
                                        </BugCards>
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
                                if( task.done && task.enabled ){
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

                        {
                            bugsToDoList 
                            && bugsToDoList.map( 
                            (bug,i) => {
                                if( bug.done && bug.enabled ){
                                    return (
                                        <BugCards  key={i} id={"card-"+bug.id} 
                                                    dataid={bug.id} datasource="board-to-do"
                                                    backgroundColor="#98FB98"
                                                    className="card" draggable="true">
                                                    <p>{bug.BugTitle}</p>
                                        </BugCards>
                                    );
                                }
                            })
                        }
                    </KanbanBoard>
                </main>
            </div>
        </div>
        </div>
        )
    }
}
export default connect(mapeStateToProps, mapDispatchToProps)(KanbanBoardContainer);