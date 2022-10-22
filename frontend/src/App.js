import logo from './logo.svg';
import './App.css';
import fetchRoute from './api/fetchRoute';

import * as React from 'react';

import { useEffect, useState } from 'react';

function App() {
  const [ state, setState ] = useState('test');
  useEffect(() => {
    fetchRoute('/posts').then(res => {
      setState(JSON.stringify(res));

    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to {state}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
