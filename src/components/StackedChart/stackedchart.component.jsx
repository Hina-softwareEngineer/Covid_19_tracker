import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



am4core.useTheme(am4themes_animated);

class StackedChart extends React.Component {



    componentDidMount() {


        let country = this.props.country;
        let histories = country[0].values.confirmedHistory;
        let histories2 = country[0].values.deathsHistory;
        let histories3 = country[0].values.recoveredHistory;

        let keys = Object.keys(histories);


        let chart_data = [];

        keys.forEach(key => {
            chart_data.push({ date: new Date(key), value: histories[key], value2: histories2[key], value3: histories3[key] });
        });




        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = chart_data;


        chart.colors.list = [
            am4core.color("#03a9f4"),
            am4core.color("#f44336"),
            am4core.color("#4caf50"),
        ];

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dataFields.date = "date";
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");
        // dateAxis.showOnInit = false;
        // ...
        chart.events.on("ready", function () {
            dateAxis.zoomToDates(
                chart_data[chart_data.length - 6].date,
                chart_data[chart_data.length - 1].date,
                false,
                true // this makes zoom instant
            );
        });

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;


        var fillModifier = new am4core.LinearGradientModifier();
        fillModifier.brightnesses = [-0.2, 1, -0.2];
        fillModifier.offsets = [0, 0.5, 1];



        // Create series
        function createSeries(field, name) {

            // Set up series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.name = name;
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.sequencedInterpolation = true;


            series.columns.template.fillModifier = fillModifier;
            series.alignLabels = true;

            // Make it stacked
            series.stacked = true;

            // Configure columns
            series.columns.template.width = am4core.percent(60);
            series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{dateX}: {valueY}";

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
        chart.legend.labels.template.fill = am4core.color("lightgrey");

    }

    render() {


        return (
            <div className="map">

                <div className="header">
                    <h1>{this.props.country[0].country} Covid-19 History</h1>
                </div>
                <div id="chartdiv"
                    style={{ height: "500px" }}>

                </div>
            </div>
        );
    }
}


export default StackedChart;