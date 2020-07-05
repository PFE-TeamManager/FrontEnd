import React from 'react';
import {connect} from "react-redux";
import { Spinner } from '../Global/Spinner';
import { SearchContainer } from '../BackOffice/Search/SearchContainer';

const mapeStateToProps = state => ({
    ...state.searchTask
});

class Notfound extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        if( !this.props.isAuthenticated ){
            setTimeout(() => {
                this.props.history.push('/');//Redirect when user is not loggedin
            }, 1000);
        }
    }

    render(){

        const {searchTask,isFetching} = this.props;


        if( searchTask ){

            if (isFetching) {
                return (<Spinner />);
            }

            return(
                <div>
                    {/* <main className="app-content"> */}
                        <SearchContainer searchTask={searchTask} />
                    {/* </main> */}
                </div>
            );
        }

        return(
            <h1>Not found</h1>
        );
    }

}

export default connect(mapeStateToProps, null)(Notfound);