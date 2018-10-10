import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Home from './Home';
import MyCompositions from './MyCompositions';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div className="Root">
          <header>
            <h1 className="title"><Link to="/">Notator</Link></h1>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/signup" component={SignupForm} />
              <Route exact path="/mycompositions" component={MyCompositions} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

