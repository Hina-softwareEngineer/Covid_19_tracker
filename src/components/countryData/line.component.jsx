import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
class Line extends Component {

    componentDidMount() {
        am4core.useTheme(am4themes_animated);

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
        return (
            <div id="chartdiv4"
                style={{ height: "500px" }}>

            </div>
        );
    }
}

export default Line;