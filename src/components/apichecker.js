import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


am4core.useTheme(am4themes_animated);

class ApiChecker extends Component {
    state = {
        data: {},
        history: {},
        confirmed: 0,
        deaths: 0,
        mapChart: null,
        recovered: 0
    }

    componentDidMount() {
        fetch('https://coronavirus-tracker-api.herokuapp.com/all')
            .then(res => res.json())
            .then(result => {
                let res = result["latest"]
                this.setState({
                    data: result,
                    history: result["confirmed"]["locations"][0]["history"],
                    mapChart: result["confirmed"]["locations"],
                    confirmed: res["confirmed"],
                    deaths: res["deaths"],
                    recovered: res["recovered"]
                });
            })
    }

    render() {
        let results = this.state;
        console.log(results.data)


        return (
            <div>
                <h1>Hina</h1>
                <h1>Confirmed : {results.confirmed}</h1>
                <h1>Deaths : {results.deaths}</h1>
                <h1>Recovered : {results.recovered}</h1>

                {
                    (Object.keys(results.data).length > 1) ?
                        <div><p>Confirmed Last Updated : {results.data.confirmed.last_updated}</p>
                            <p>Confirmed Last Updated : {results.data.deaths.last_updated}</p>
                            <p>Confirmed Last Updated : {results.data.recovered.last_updated}</p>
                        </div>
                        : null
                }

                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>


            </div>
        );
    }

}

export default ApiChecker;