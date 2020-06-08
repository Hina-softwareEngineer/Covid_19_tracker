import React, { Component } from 'react';
import "./statistics.styles.css";

const Statistics = (props) => (
    // <div className={`box ${
    //     props.color ? props.color : null
    //     }`} >
    //     <h3>{props.name} Cases</h3>
    //     <h1>{

    //         props.stats.latest ?
    //             props.stats.latest.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) :
    //             null}</h1>
    //     <p>Last Updated : {
    //         (props.stats.last_updated ? new Date(props.stats.last_updated)
    //             .toTimeString().match(/\d+:\d+:\d+/)[0] : "Loading...")
    //     }</p>

    //     <div className={`line ${
    //         props.color ? props.color : null
    //         }line`}></div>
    // </div>
    <div className={`box ${
        props.color ? props.color : null
        }`} >
        <h3>{props.name} Cases</h3>
        <h1>{

            props.stats ?
                props.stats.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) :
                null}</h1>
        {/* <p>Last Updated : {
            (props.stats.last_updated ? new Date(props.stats.last_updated)
                .toTimeString().match(/\d+:\d+:\d+/)[0] : "Loading...")
        }</p> */}

        <div className={`line ${
            props.color ? props.color : null
            }line`}></div>
    </div>
)

export default Statistics;