import React, { Component } from 'react';
import Statistics from '../components/statistics/statistics.component'
import PieChart from '../components/PieChart/piechart.components';
import WorldMap from "../components/worldMap/worldmap.component";
import WorldList from '../components/WorldList/worldlist.component';


class Home extends Component {


    state = {
        data: this.props.someProp,
    };

    render() {
        let states = this.state;

        return (

            <div>
                <div className="boxes">
                    <Statistics stats={states.data.confirmed} name="Confirmed" color="blue" />
                    <Statistics stats={states.data.deaths} name="Deaths" color="red" />
                    <Statistics stats={states.data.recovered} name="Recovered" color="green" />
                </div>

                <div className="map">
                    {
                        states.data ? <WorldMap data={states.data} /> : null
                    }

                </div>

                <div className="container">

                    {
                        states.data ? <PieChart data={states.data.confirmed} /> : null
                    }

                    {
                        states.data ? <WorldList data={states.data} /> : null
                    }

                </div>
            </div>);
    }
}

export default Home;