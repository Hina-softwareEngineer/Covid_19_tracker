import React, { Component } from 'react';
import { connect } from 'react-redux';
import Statistics from '../components/statistics/statistics.component'
import WorldMap from "../components/worldMap/worldmap.component";
import WorldList from '../components/WorldList/worldlist.component';
import ChartPie from '../components/TopTenChart/toptenchart.component';


class Home extends Component {

    render() {

        let { data } = this.props;


        return (

            <div>
                <Statistics stats={{
                    confirmed: data.confirmed.latest,
                    deaths: data.deaths.latest,
                    recovered: data.recovered.latest,
                    last_updatedConfirmed: data.confirmed.last_updated,
                    last_updatedDeaths: data.deaths.last_updated,
                    last_updatedRecovered: data.recovered.last_updated
                }} />


                <WorldMap />


                <div className="container">
                    <ChartPie />
                    <WorldList />
                </div>
            </div>);
    }
}

const mapStateToProps = state => ({
    data: state.country.data,

});


export default connect(mapStateToProps, null)(Home);