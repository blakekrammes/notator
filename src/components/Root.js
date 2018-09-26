import React, { Component } from 'react';
import {Instructions} from './Instructions';
import Button from './Button';
import './Root.css';

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <header>
          <h1 className="title">Singer</h1>
        </header>
        <Button />
        <Instructions />
      </div>
    );
  }
}

export default Root;
