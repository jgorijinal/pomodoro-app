import React from 'react';
import './App.css';
import {Link, HashRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Index from './components/Index';
import SignUp from './components/SingUp/SignUp';
import NoMatch from './components/NoMatch/NoMatch';

function App() {
  return (
    <Router >
      <div>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signUp">
            <SignUp/>
          </Route>
          <Route path="/" >
            <Index/>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
