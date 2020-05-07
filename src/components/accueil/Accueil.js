
import React from 'react';
import '../accueil/Accueil.css';
import 'bootstrap/dist/css/bootstrap.css';

import Icon1 from 'react-ionicons/lib/MdHome';
import Icon2 from 'react-ionicons/lib/MdCheckmark';
import Icon3 from 'react-ionicons/lib/IosClock';
import Icon4 from 'react-ionicons/lib/MdPaper';
import Icon5 from 'react-ionicons/lib/MdPie';
import Icon6 from 'react-ionicons/lib/MdPerson';


class Accueil extends React.Component {

    constructor(props){
        super(props);    
    }

    render(){
        return (
            
         <div id="content-wrapper" className="d-flex">
            <div id="sidebar-container" className="bg-light border-right" >
               <div className="logo">
                   <h4 className="font-weight-bold mb-0">TEAM MANAGER</h4>
                   </div>
               <div className="menu list-group-flush">
                   <a href="" className="list-group-item list-group-item-action bg-light p-3 border-0"> <Icon1 className="icon" />
                   DASHBOARD</a> 
                   <a href="" className="list-group-item list-group-item-action bg-light p-3 border-0"> <Icon5 className="icon" />
                   PROJECTS</a>   
                     <a href="" className="list-group-item list-group-item-action bg-light p-3 border-0"> <Icon2 className="icon" />
                     TASKS</a> 
                     <a href="" className="list-group-item list-group-item-action bg-light p-3 border-0"> <Icon3 className="icon"/>
                     HOURS</a>
                     <a href="" className="list-group-item list-group-item-action bg-light p-3 border-0"> <Icon4 className="icon"/>
                     MANAGE</a>
                     <a href="" className="list-group-item list-group-item-action bg-light p-3 border-0"> <Icon6 className="icon"/>
                     TEAM</a>
                                 
               </div>
             </div>
        <div id="page-container" className="w-100">
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Projets <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Flux<span class="sr-only">(current)</span></a>
                    </li>
                   
                    </ul>
                     <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                     </form>
                 <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Majda
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item" href="#"></a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Deconnecter</a>
                            </div>
                        </li>
                 </ul>
                
                </div>
             </nav>
           </div>
         </div>
   
         
        );
    }
}

export default Accueil; 