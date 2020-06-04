import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApiChecker from './components/apichecker';
import World from './components/world';
function App() {
  return (
    <div className="App">
      {/* <World /> */}
      <ApiChecker />
    </div>
  );
}

export default App;
