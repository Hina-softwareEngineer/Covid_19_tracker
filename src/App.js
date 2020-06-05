import React, { Component } from 'react';
import './App.css';
import Statistics from './components/statistics/statistics.component'
import ApiChecker from './components/apichecker';
import World from './components/world';
import Gauge from './components/gauge';
import List from "./components/list";
import WorldMap from "./components/worldMap/worldmap.component";

class App extends Component {

  constructor() {
    super();

    this.state = {

      data: {},
      historyConfirmed: {},
      historyRecovered: {},
      historyDeaths: {},
      confirmed: 0,
      deaths: 0,
      recovered: 0

    };
  }

  componentDidMount() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/all')
      .then(res => res.json())
      .then(result => {

        this.setState({
          data: result,
          historyConfirmed: result["confirmed"]["locations"][0]["history"],
          historyRecovered: result["recovered"]["locations"][0]["history"],
          historyDeaths: result["deaths"]["locations"][0]["history"],
          confirmed: result["confirmed"],
          deaths: result["deaths"],
          recovered: result["recovered"]
        })
        console.log(this.state.data);
      })
      .catch((err) => (alert("Error in making Request : ", err)));

  }



  render() {

    let states = this.state;
    console.log(states.confirmed);

    return (
      <div className="App">
        <div className="boxes">
          <Statistics stats={states.confirmed} name="Confirmed" color="blue" />
          <Statistics stats={states.deaths} name="Deaths" color="red" />
          <Statistics stats={states.recovered} name="Recovered" color="green" />
        </div>

        <div>
          {
            states.confirmed ? <WorldMap data={states.confirmed} /> : null
          }

        </div>
      </div>
    );
  }

}


export default App;
