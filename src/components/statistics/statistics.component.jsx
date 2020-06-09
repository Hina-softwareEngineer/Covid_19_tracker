import React from 'react';
import StatisticsBox from "../StatisticsBox/statisticsbox.component";
import "./statistics.styles.css";

const Statistics = ({ stats }) => {
    console.log(stats)
    return (
        <div className="boxes">
            <StatisticsBox stats={{ cases: stats.confirmed, updated: stats.last_updatedConfirmed }} name="Confirmed" color="blue" />
            <StatisticsBox stats={{ cases: stats.deaths, updated: stats.last_updatedDeaths }} name="Deaths" color="red" />
            <StatisticsBox stats={{ cases: stats.recovered, updated: stats.last_updatedRecovered }} name="Recovered" color="green" />
        </div>
    )
};

export default Statistics;