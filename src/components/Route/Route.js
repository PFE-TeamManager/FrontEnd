import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={dashboard} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))