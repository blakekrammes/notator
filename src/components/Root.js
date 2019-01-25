import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Home from './Home';
import MyCompositions from './MyCompositions';
import DetailedInstructions from './DetailedInstructions';

export default function Root() {
  if (typeof window.orientation !== 'undefined') { 
    alert('Notator is not yet supported for mobile devices or tablets. Please use a desktop.')
  }
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/mycompositions" component={MyCompositions} />
          <Route exact path="/instructions" component={DetailedInstructions} />
        </Switch>
    </Router>
  );
}
