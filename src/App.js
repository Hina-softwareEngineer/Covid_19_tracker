import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApiChecker from './components/apichecker';
import World from './components/world';
import Gauge from './components/gauge';
import List from "./components/list";

function App() {
  return (
    <div className="App">
      {/* <World /> */}
      <List />
    </div>
  );
}

export default App;
