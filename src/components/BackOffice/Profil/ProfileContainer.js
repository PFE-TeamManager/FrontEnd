import React from 'react';
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Spinner } from '../../Global/Spinner';
import Avatar from 'react-avatar';
import { userPATCH } from "../../../redux/actions/actions";

const MyReactSwal = withReactContent(Swal);

const mapeStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = {
    userPATCH
};

class ProfileContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            editing: '',
            newDesc: ''
        }
    }

    showEditInput = () => {
        this.setState({
            editing: true
        })
    }

    showInfo = (event) => {
        var elementClasses = document.getElementsByClassName("tab-profil");
        for (var i = 0; i < elementClasses.length; i++) {
            elementClasses[i].classList.remove('active');
            elementClasses[i].classList.remove('show');
        }


        var elementId = event.target.attributes["data-id"].nodeValue;
        var appMenu = document.getElementById(elementId);
        appMenu.classList.toggle("active");
        appMenu.classList.toggle("show");
    }

    editFunction = () => {
        userPATCH(this.refs.newDesc.value,this.props.userData.id);
        this.setState({
          editing: false,
          newDesc: this.refs.newDesc.value
        });
        MyReactSwal.fire({
          icon: 'success'
        });
    }

    handleEditingDesc = (description) => {
        if( (this.state.editing === true) ){
          return (
            <div>
                <textarea  ref="newDesc" className="form-control"
                        defaultValue={ this.state.newDesc ? this.state.newDesc : description }></textarea>
                <button className="btn btn-info" 
                        onClick={ () => {this.editFunction()} } >
                        <i className="app-menu__icon fa fa-edit"></i>
                </button>
                <button className="btn btn-warning" 
                        onClick={ () => {this.setState({editing:''})} } >
                        <i className="app-menu__icon fa fa-window-close"></i>
                </button>
            </div>
          )
        }
        if( (this.state.editing === false) ){
          return <p>{this.state.newDesc}</p>
        }
        if( (this.state.editing === '') ){
          return <p>{ this.state.newDesc ? this.state.newDesc : description }</p>
        }
    }

    render() {
        const {isFetching} = this.props;

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
            <div className="row user">
                <div className="col-md-12">
                    <div className="profile">
                        <div className="info">
                                <Avatar size="100"
                                        name={this.props.userData.username} />
                                <h4>{this.props.userData.username}</h4>
                                <p>
                                    { this.props.userData.roles.includes("ROLE_DEV") ? "Développeur" : "" }
                                    { this.props.userData.roles.includes("ROLE_CHEF_PROJET") ? "Chef Projet" : "" }
                                </p>
                        </div>
                        <div className="cover-image"></div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="tile p-0">
                        <ul className="nav flex-column nav-tabs user-tabs">
                            <li className="nav-item">
                                <a  className="nav-link active" 
                                    onClick = { this.showInfo.bind(this) } 
                                    href="#" data-id="user-info" 
                                    data-toggle="tab">
                                        Informations
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane tab-profil active" id="user-info">
                            <button className="btn btn-info float-right m-1" 
                                    onClick={this.showEditInput}>
                                <i className="app-menu__icon fa fa-edit"></i>
                            </button>
                            <div className="card p-4">
                                { this.handleEditingDesc(this.props.userData.description) }
                            </div>
                        </div>
                    </div>

                    <div className="tab-content">
                        <div className="tab-pane tab-profil active" id="user-info">
                            <div className="card p-4">
                                System of Trophies needed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapeStateToProps, mapDispatchToProps)(ProfileContainer);