import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Guard from './components/Guard/Guard';
import Dashboard from './components/BackOffice/Dashboard/Dashboard';
import Register from './components/Guard/Register/Register';
import Notfound from "./components/Global/notfound";

function App() {
  return (

    <div className="App">
          {/* Must verify The connection of the user to show either dahsboard or Guard  */}
          <Switch>
            <Route exact path="/" component={Guard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route component={Notfound} />
          </Switch>
    </div>
  );
}

export default App;
