import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



am4core.useTheme(am4themes_animated);

class StackedChart extends React.Component {


    componentDidMount() {



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




        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = chart_data;

        // Add data
        // chart.data = [{
        //   "year": "2016",
        //   "europe": 2.5,
        //   "namerica": 2.5,
        //   "asia": 2.1,
        //   "lamerica": 0.3,
        //   "meast": 0.2,
        //   "africa": 0.1
        // }, {
        //   "year": "2017",
        //   "europe": 2.6,
        //   "namerica": 2.7,
        //   "asia": 2.2,
        //   "lamerica": 0.3,
        //   "meast": 0.3,
        //   "africa": 0.1
        // }, {
        //   "year": "2018",
        //   "europe": 2.8,
        //   "namerica": 2.9,
        //   "asia": 2.4,
        //   "lamerica": 0.3,
        //   "meast": 0.3,
        //   "africa": 0.1
        // }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
        categoryAxis.dataFields.date = "date";
        categoryAxis.renderer.grid.template.location = 0;
        // categoryAxis.zoomToDates(start, end);


        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;

        // Create series
        function createSeries(field, name) {

            // Set up series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.name = name;
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.sequencedInterpolation = true;

            // Make it stacked
            series.stacked = true;

            // Configure columns
            series.columns.template.width = am4core.percent(60);
            series.columns.template.tooltipText = "[bold]{series.name}[/]\n[font-size:14px]{dateX}: {valueY}";

            // Add label
            var labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = "{valueY}";
            labelBullet.locationY = 0.5;
            labelBullet.label.hideOversized = true;

            return series;
        }

        createSeries("value", "Confirmed");
        createSeries("value2", "Deaths");
        createSeries("value3", "Recovered");



        // Legend
        chart.scrollbarX = new am4core.Scrollbar();
        chart.legend = new am4charts.Legend();













        // am4core.useTheme(am4themes_animated);

        // let chart = am4core.create("chartdiv4", am4charts.XYChart);

        // chart.paddingRight = 20;
        // let country = this.props.country;
        // console.log("contry", country);
        // let histories = country[0].values.confirmedHistory;
        // let histories2 = country[0].values.deathsHistory;
        // let histories3 = country[0].values.recoveredHistory;

        // let keys = Object.keys(histories);


        // let chart_data = [];
        // var i = 0;


        // keys.forEach(key => {
        //     chart_data.push({ date: new Date(key), name: "names" + i, value: histories[key], value2: histories2[key], value3: histories3[key] });
        // });

        // chart.data = chart_data;



        // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

        // dateAxis.renderer.minGridDistance = 50;
        // dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");

        // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        // valueAxis.renderer.minWidth = 35;

        // let series = chart.series.push(new am4charts.LineSeries());
        // series.dataFields.dateX = "date";
        // series.dataFields.valueY = "value";
        // series.tooltipText = "{valueY.value} cases Confirmed";
        // chart.cursor = new am4charts.XYCursor();
        // chart.cursor.lineX.stroke = am4core.color("#9e9e9e");
        // chart.cursor.lineY.stroke = am4core.color("#9e9e9e");
        // chart.cursor.lineX.strokeWidth = 2;
        // chart.cursor.lineY.strokeWidth = 2;
        // series.strokeWidth = 2;
        // series.fill = "#0394f4";
        // chart.fillModifier = am4core.color("#ffffff");
        // series.stroke = am4core.color("#03a9f4");



        // let series2 = chart.series.push(new am4charts.LineSeries());
        // series2.dataFields.valueY = "value2";
        // series2.dataFields.dateX = "date";
        // series2.strokeWidth = 2;
        // series2.fill = "red";
        // series2.tooltipText = "{valueY.value} cases Deaths";
        // series2.stroke = am4core.color("#f44336");


        // let series3 = chart.series.push(new am4charts.LineSeries());
        // series3.dataFields.valueY = "value3";
        // series3.dataFields.dateX = "date";
        // series3.strokeWidth = 2;
        // series3.stroke = am4core.color("#4caf50");
        // series3.fill = "#03f42b";
        // series3.tooltipText = "{valueY.value} cases Recovered";


        // this.chart = chart;

    }

    render() {
        return (
            <div className="map">

                <div className="header">
                    <h1>{this.props.country.country} Covid-19 History</h1>
                </div>
                <div id="chartdiv"
                    style={{ height: "500px" }}>

                </div>
            </div>
        );
    }
}


export default StackedChart;