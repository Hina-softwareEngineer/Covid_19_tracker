import React, { Component } from 'react';
import './piechart.styles.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



am4core.useTheme(am4themes_animated);

class PieChart extends Component {

    state = {
        loaded: false,
    }

    showChart() {

        let chart = am4core.create("chartdiv1", am4charts.PieChart);

        chart.data = this.props.chart;
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "cases";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#1B5E20");
        pieSeries.slices.template.strokeWidth = 1;
        pieSeries.slices.template.propertyFields.fill = "color";
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
        this.setState({ loaded: false });
        setTimeout(() => {
            this.setState({ loaded: true });
            this.showChart();
        }, 3000);
    }


    render() {

        if (!this.state.loaded) {
            return <div className="loadercenter"><Loader
                type="Circles"
                color="#00e5ff"
                height={100}
                width={100}
                timeout={0} //3 secs 
            />
            </div>
                ;
        }

        return (
            <div className="piechart">
                <h1>{this.props.heading}</h1>
                <div id="chartdiv1" style={{ width: "100%", height: "500px" }}></div>
            </div>
        );
    }

}



export default PieChart;
