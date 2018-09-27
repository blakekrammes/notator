import React, { Component } from 'react';
import {Instructions} from './Instructions';
import AudioButton from './AudioButton';
import SheetMusic from './SheetMusic';
import './Root.css';

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <header>
          <h1 className="title">Singer</h1>
          <h3 className="range">The range is C2 – C6</h3>
        </header>
        <AudioButton />
        <Instructions />
        <SheetMusic />
      </div>
    );
  }
}

export default Root;
