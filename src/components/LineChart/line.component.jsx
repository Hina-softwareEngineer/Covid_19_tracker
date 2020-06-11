import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import './line.styles.css';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
class Line extends Component {

    componentDidMount() {


        let chart = am4core.create("chartdiv4", am4charts.XYChart);

        chart.paddingRight = 20;
        let country = this.props.country;
        console.log("contry", country);
        let histories = country[0].values.confirmedHistory;
        let histories2 = country[0].values.deathsHistory;
        let histories3 = country[0].values.recoveredHistory;

        let keys = Object.keys(histories);


        let chart_data = [];
        var i = 0;


        keys.forEach(key => {
            chart_data.push({ date: new Date(key), name: "names" + i, value: histories[key], value2: histories2[key], value3: histories3[key] });
        });

        chart.data = chart_data;



        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value} cases Confirmed";
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.stroke = am4core.color("#9e9e9e");
        chart.cursor.lineY.stroke = am4core.color("#9e9e9e");
        series.name = "Confirmed";
        chart.cursor.lineX.strokeWidth = 2;
        chart.cursor.lineY.strokeWidth = 2;
        series.strokeWidth = 2;
        series.fill = "#0394f4";
        chart.fillModifier = am4core.color("#ffffff");
        series.stroke = am4core.color("#03a9f4");



        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.dateX = "date";
        series2.strokeWidth = 2;
        series2.name = "Deaths";
        series2.fill = "red";
        series2.tooltipText = "{valueY.value} cases Deaths";
        series2.stroke = am4core.color("#f44336");


        let series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "value3";
        series3.dataFields.dateX = "date";
        series3.strokeWidth = 2;
        series3.name = "Recovered";
        series3.stroke = am4core.color("#03f42b");
        series3.fill = "#03f42b";
        series3.tooltipText = "{valueY.value} cases Recovered";

        chart.legend = new am4charts.Legend();
        chart.legend.labels.template.fill = am4core.color("lightgrey");
        this.chart = chart;

    }

    render() {
        return (
            <div className="map">

                <div className="header">
                    <h1>{this.props.country.county} Covid-19 History</h1>
                </div>
                <div id="chartdiv4"
                    style={{ height: "500px" }}>

                </div>
            </div>
        );
    }
}

export default Line;