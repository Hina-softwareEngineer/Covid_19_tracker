import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ApiChecker extends Component {
    state = {
        data: {},
        history: {},
        confirmed: 0,
        deaths: 0,
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
                    confirmed: res["confirmed"],
                    deaths: res["deaths"],
                    recovered: res["recovered"]
                })
                console.log('in fetch', this.state);
                let chart = am4core.create("chartdiv", am4charts.XYChart);

                chart.paddingRight = 20;



                let histories = this.state.history;
                let chart_data = [];
                var i = 0;

                for (var dates in histories) {
                    chart_data.push({ dates, name: "names" + i, value: histories[dates] });
                    i = i + 1;
                }
                console.log('history data: ', chart_data);


                chart.data = chart_data;

                let dateAxis = chart.xAxes.push(new am4charts.ValueAxis());
                dateAxis.dataFields.category = "dates";
                // dateAxis.renderer.grid.template.location = 0;
                dateAxis.strictMinMax = true;

                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                valueAxis.tooltip.disabled = true;
                // valueAxis.renderer.minWidth = 35;

                let series = chart.series.push(new am4charts.LineSeries());

                series.dataFields.valueX = "dates";
                series.dataFields.valueY = "value";

                series.tooltipText = "{valueY.value}";
                chart.cursor = new am4charts.XYCursor();

                let scrollbarX = new am4charts.XYChartScrollbar();
                scrollbarX.series.push(series);
                chart.scrollbarX = scrollbarX;

                this.chart = chart;
            })

            .catch(err => console.log(err))


    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        let results = this.state;
        console.log(results.data)
        console.log(results.history)

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