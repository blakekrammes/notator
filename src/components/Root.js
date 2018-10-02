import React, { Component } from 'react';
import {Instructions} from './Instructions';
import AudioButton from './AudioButton';
import SheetMusic from './SheetMusic';
import SignupForm from './SignupForm';
import './Root.css';

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <header>
          <h1 className="title">Sing or Play Into the Microphone and Press Keys to Create Notation</h1>
          <h3 className="range">The range is F1 – C7</h3>
        </header>
        <AudioButton />
        <SignupForm />
        <Instructions />
        <SheetMusic />
      </div>
    );
  }
}

export default Root;
