import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import Country from "./components/countryData/country.component";
import Home from './pages/home.component';

class App extends Component {

  constructor() {
    super();

    this.state = {

      data: null,
      historyConfirmed: {},
      historyRecovered: {},
      historyDeaths: {},
      confirmed: 0,
      deaths: 0,
      recovered: 0,


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
          recovered: result["recovered"],
        })
        console.log(this.state.data);
      })
      .catch((err) => (alert("Error in making Request : ", err)));

  }



  render() {

    let states = this.state;
    console.log(states.confirmed, states.deaths, states.recovered);

    return (
      <div className="App">

        {
          states.data ?
            <Switch>
              <Route exact path='/' render={() => <Home someProp={states.data} />} />
              <Route path='/country/:countryId' render={() => <Country />} />} />

        </Switch> : "Loading........"
        }

      </div>
    );
  }

}


export default App;
