import React from 'react';
import '../Auth/Login.css';
import 'bootstrap/dist/css/bootstrap.css';

class Login extends React.Component {

    constructor(props){
        super(props);    
    }

    render(){
        return (
            
     
<div id="global">
  <section className="homestayle__HomeWrapper">

  <img src="/img/circle_shapes.9a98d481.svg" className="home__shape"/>
<div className="INpJQ">
    <div className="home__left">
    <div className="homme__text">
        <h1 className="text--light">Trak</h1>
        <h1 className="text--light">Manager</h1>
        <h1 className="text--light"> kill Bugs</h1>
        <h1 className="text--bold">Effectively</h1>

    </div>
    </div>
 
    <div className="home__right">
        <div className="dGFQqm">
            <div direction="column" className="kLcTCV">
                <h3 className="text--blod">Team Manager</h3>
    <h2 className="text--bold">Welcome back!</h2>
    <form>
<div className="jyrWoS">
<label className="dEJYeV">
        <input type="email" name="email" placeholder="example@gmail.com" className="kbJoKk"/>
         </label>
         <label className="dEJYeV">
             <input type="password" name="password" placeholder="password" class="kbJoKk"/>

         </label>
         <button width="50%" className="dmMIzf">
             <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" 
             class="fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 448 512" data-testid="icon"><path 
             fill="currentColor" 
             d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                 </path>
                 </svg>Login
         </button>

</div>


    </form>

    <a className="izXZVG" 
    href="">Don't have an account?
    <svg aria-hidden="true" focusable="false" data-prefix="fas" 
    data-icon="arrow-right" className="svg-inline--fa.fa-w-14" 
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
        </path></svg></a>

    </div>
    </div>
    </div>
    </div>
    </section>  
      

</div>

          
         
        );
    }
}

export default Login; 
