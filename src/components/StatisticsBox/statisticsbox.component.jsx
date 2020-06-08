import React from 'react';

const StatisticsBox = ({ stats, name, color }) => (
    <div>
        <div className={`box ${
            color ? color : null
            }`} >
            <h3>{name} Cases</h3>
            <h1>{

                stats.latest ?
                    stats.latest.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) :
                    null}</h1>
            <p>Last Updated : {
                (stats.last_updated ? new Date(stats.last_updated)
                    .toTimeString().match(/\d+:\d+:\d+/)[0] : "Loading...")
            }</p>
        </div>
    </div>
);


export default StatisticsBox;