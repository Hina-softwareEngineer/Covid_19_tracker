import React, { Component } from 'react';
import './piechart.styles.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

class PieChart extends Component {

    state = {
        topTenConfirmed: this.props.data,
    }



    showChart() {
        let toptenCountries = this.state.topTenConfirmed.locations;


        let cleaningData = {};
        // Removing countries having Provinces and adding total cases of those countries
        for (var i = 0; i < toptenCountries.length; i++) {
            if (!cleaningData[toptenCountries[i].country]) {
                cleaningData[toptenCountries[i].country] = toptenCountries[i].latest
            }
            else {
                cleaningData[toptenCountries[i].country] += toptenCountries[i].latest;
            }
        }

        let chartData = [];
        for (var data in cleaningData) {
            chartData.push({ country: data, cases: cleaningData[data] });
        }

        // sorting data in descending order
        chartData.sort(function (a, b) { if (a.cases < b.cases) return 1; if (a.cases > b.cases) return -1; return 0 });

        let others = 0;
        let Finaldata = chartData.filter((country, index) => {
            if (index < 10) {
                return country;
            }
            if (index > 9) {
                others += country.cases
            }
        });

        Finaldata.push({ country: "Other", cases: others });

        let chart = am4core.create("chartdiv1", am4charts.PieChart);
        chart.data = Finaldata;
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "cases";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#546e7a");
        pieSeries.slices.template.strokeWidth = 1;
        pieSeries.alignLabels = false;
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.text = "";
        pieSeries.slices.template.strokeOpacity = 0.5;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
    }

    componentDidMount() {
        this.showChart();
    }


    render() {
        return (
            <div className="piechart">
                <h1>Most Affected Countries</h1>
                <div id="chartdiv1" style={{ width: "100%", height: "500px" }}></div>
            </div>
        );
    }

}

export default PieChart;