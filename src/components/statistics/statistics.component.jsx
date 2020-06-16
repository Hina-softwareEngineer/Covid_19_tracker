import React from 'react';
import StatisticsBox from "../StatisticsBox/statisticsbox.component";
import "./statistics.styles.css";

const Statistics = ({ stats }) => {
    const { confirmed, last_updatedConfirmed, deaths, last_updatedDeaths, recovered, last_updatedRecovered } = stats
    return (
        <div className="boxes">
            <StatisticsBox stats={{ cases: confirmed, updated: last_updatedConfirmed }} name="Confirmed" color="blue" />
            <StatisticsBox stats={{ cases: deaths, updated: last_updatedDeaths }} name="Deaths" color="red" />
            <StatisticsBox stats={{ cases: recovered, updated: last_updatedRecovered }} name="Recovered" color="green" />
        </div>
    )
};

export default Statistics;