import React from 'react';
import StatisticsBox from "../StatisticsBox/statisticsbox.component";
import "./statistics.styles.css";

const Statistics = ({ stats }) => (
    <div className="boxes">
        <StatisticsBox stats={stats.confirmed} name="Confirmed" color="blue" />
        <StatisticsBox stats={stats.deaths} name="Deaths" color="red" />
        <StatisticsBox stats={stats.recovered} name="Recovered" color="green" />
    </div>
);

export default Statistics;