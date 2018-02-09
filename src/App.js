import React, { Component } from 'react';
import { Audio } from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hi, Welcome to Echo-Room</h1>
        <Audio />
      </div>
    );
  }
}

export default App;
