import React from 'react';
import { connect } from 'react-redux';

import CountriesList from '../../components/CountriesList';
import ToptenCountries from '../../components/TopTenChart/toptenchart.component';
import Statistics from '../../components/statistics/statistics.component'
import WorldMap from "../../components/worldMap/worldmap.component";


const Home = ({ data }) => (
    <>
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
            <ToptenCountries />
            <CountriesList />
        </div>
    </>
);

const mapStateToProps = state => ({
    data: state.country.data,
});


export default connect(mapStateToProps, null)(Home);