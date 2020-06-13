import React, { Component } from 'react';
import './global-chart.styles.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


// Themes begin
am4core.useTheme(am4themes_animated);



class GlobalChart extends Component {

    state = {
        count: 1,
    }

    chartData1() {
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        let allProps = this.props;
        let worldMap = allProps.chartData;


        let mapData = [];

        worldMap.forEach(country => {
            mapData.push({
                id: country.country_code,
                name: country.country,
                value: country.latest,
                color: allProps.color
            });
        });

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeWidth = 0.5;
        polygonSeries.calculateVisualCenter = true;

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.fill = am4core.color("#29434e");
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.stroke = am4core.color("#546e7a");

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#1c313a");

        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.data = mapData;
        imageSeries.dataFields.value = "value";

        let imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = true

        let circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 0.7;
        circle.propertyFields.fill = "color";
        circle.tooltipText = "{name}: [bold]{value}[/]";
        circle.stroke = am4core.color(allProps.border);


        imageSeries.heatRules.push({
            "target": circle,
            "property": "radius",
            "min": 4,
            "max": 30,
            "dataField": "value"
        })

        imageTemplate.adapter.add("latitude", function (latitude, target) {
            let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
            if (polygon) {
                return polygon.visualLatitude;
            }
            return latitude;
        })

        imageTemplate.adapter.add("longitude", function (longitude, target) {
            let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
            if (polygon) {
                return polygon.visualLongitude;
            }
            return longitude;
        })
    }

    componentDidMount() {
        this.setState({ count: 1 });
        setTimeout(() => {
            this.setState({ count: 2 })
            this.chartData1();

        }, 5000);
    }






    render() {

        if (this.state.count === 2) {
            this.chartData1();
        }

        if (this.state.count === 1) {
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
            <div id="chartdiv"></div>

        );
    }
}


export default GlobalChart;