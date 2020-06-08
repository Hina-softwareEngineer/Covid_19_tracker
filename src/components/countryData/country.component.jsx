import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Statistics from '../statistics/statistics.component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class Country extends Component {

    state = {
        // country: this.props.country,
        data: this.props.country,
        cleanedData1: [],
        search: [],
    }

    displayList() {
        let states = this.state.data;
        let historyConfirmed = states.confirmed.locations;
        let historyRecovered = states.recovered.locations;
        let historyDeath = states.deaths.locations;


        let arr = {};

        for (var i = 0; i < historyConfirmed.length; i++) {
            if (!arr[historyConfirmed[i].country]) {

                arr[historyConfirmed[i].country] = {
                    country_code: historyConfirmed[i].country_code,
                    province: historyConfirmed[i].province,
                    confirmed: historyConfirmed[i].latest,
                    deaths: historyDeath[i].latest,
                    confirmedHistory: historyConfirmed[i].history,
                    deathsHistory: historyDeath[i].history,
                };
            }
            else {
                arr[historyConfirmed[i].country].confirmed += historyConfirmed[i].latest;
                arr[historyConfirmed[i].country].deaths += historyDeath[i].latest;

                for (var dates in historyConfirmed[i].history) {
                    arr[historyConfirmed[i].country].confirmedHistory[dates] += historyConfirmed[i].history[dates];
                    arr[historyDeath[i].country].deathsHistory[dates] += historyDeath[i].history[dates];
                }
            }
        }



        for (var i = 0; i < historyRecovered.length; i++) {
            if (historyRecovered[i].latest) {

                if (arr[historyRecovered[i].country].recovered) {
                    arr[historyRecovered[i].country].recovered += historyRecovered[i].latest;
                    for (var dates in historyRecovered[i].history) {
                        arr[historyRecovered[i].country].recoveredHistory[dates] += historyRecovered[i].history[dates];

                    }


                }
                else {
                    arr[historyRecovered[i].country] = {
                        ...arr[historyRecovered[i].country], recovered: historyRecovered[i].latest,
                        recoveredHistory: historyRecovered[i].history
                    };

                }
            }
            else {
                arr[historyRecovered[i].country] = { ...arr[historyRecovered[i].country], recovered: 0 };
            }
        }



        let names = Object.keys(arr);
        let lastArray = [];
        for (var i = 0; i < names.length; i++) {
            lastArray.push({ country: names[i], values: arr[names[i]] });
        }
        return lastArray;
        // this.setState({
        //     cleanedData1: lastArray,
        // });

    }

    componentDidMount() {
        let arary = this.displayList();
        console.log("arary", arary);

        let countryData = arary.filter(country => {
            return country.country == this.props.match.params.countryId;
        })
        this.setState({ search: countryData });
        console.log(this.state.search);
        console.log("line", countryData, this.state.search);
        this.lineGraph(countryData);
    }

    lineGraph(country) {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        console.log("contry", country);
        let histories = country[0].values.confirmedHistory;
        let histories2 = country[0].values.deathsHistory;
        let histories3 = country[0].values.recoveredHistory;

        let keys = Object.keys(histories);


        let chart_data = [];
        var i = 0;

        // for (var dates in histories) {
        //     chart_data.push({ date: new Date(dates), name: "names" + i, value: histories[dates], linecolor: "green" });
        //     i = i + 1;
        // }
        // console.log('history data: ', chart_data);

        keys.forEach(key => {
            chart_data.push({ date: new Date(key), name: "names" + i, value: histories[key], value2: histories2[key], value3: histories3[key] });
        });

        chart.data = chart_data;



        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

        dateAxis.renderer.minGridDistance = 50;
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value} cases Confirmed";
        chart.cursor = new am4charts.XYCursor();

        series.strokeWidth = 2;
        // series.fill = "red";
        // chart.colors = "red";

        chart.stroke = am4core.color("green");
        series.stroke = am4core.color("red");

        // series.propertyFields.fill = "color";

        // series.propertyFields.stroke = "lineColor";
        // series.propertyFields.fill = "lineColor";


        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.dateX = "date";
        series2.strokeWidth = 2;
        series2.tooltipText = "{valueY.value} cases Recovered";
        series2.stroke = am4core.color("pink");

        let series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "value3";
        series3.dataFields.dateX = "date";
        series3.strokeWidth = 2;
        series3.tooltipText = "{valueY.value} cases Deaths";
        series3.stroke = am4core.color("green");
        // series2.strokeDasharray = "3,4";
        // series2.stroke = series.stroke;


        this.chart = chart;
    }


    render() {
        // console.log("countryDAta", countryData);
        // let url = this.props;
        // console.log(url, url.location, "history", url.match.params.countryId);
        return (
            <div>hello
                {
                    this.state.search.length > 0 ?

                        <div className="boxes">
                            <Statistics stats={this.state.search[0].values.confirmed} name="Confirmed" color="blue" />
                            <Statistics stats={this.state.search[0].values.deaths} name="Deaths" color="red" />
                            <Statistics stats={this.state.search[0].values.recovered} name="Recovered" color="green" />
                        </div>
                        :
                        "statistics "
                }


                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                {/* <div className="map">
                    {
                        states.data ? <WorldMap data={states.data} /> : null
                    }

                </div> */}

                {/* <div className="container">

                    {
                        states.data ? <PieChart data={states.data.confirmed} /> : null
                    }

                    {
                        states.data ? <WorldList data={states.data} /> : null
                    } 

                </div> */}

                
            </div>
        );
    }
}

export default withRouter(Country);