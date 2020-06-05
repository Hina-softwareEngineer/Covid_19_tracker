import React, { Component } from 'react';
import "./worldmap.styles.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


class Statistics extends Component {

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4maps.MapChart);

        let title = chart.titles.create();
        title.text = "CoronaVirus";
        title.textAlign = "middle";

        let worldMap = this.props.data.locations;
        let mapData = [];

        worldMap.forEach(country => {
            mapData.push({
                id: country.country_code,
                name: country.country,
                value: country.latest,
                color: "purple"
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
        polygonSeries.stroke = am4core.color("red");
        polygonSeries.calculateVisualCenter = true;

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.fill = am4core.color("#4b636e");

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#62757f");

        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.data = mapData;
        imageSeries.dataFields.value = "value";

        let imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = true

        let circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 0.7;
        circle.propertyFields.fill = "color";
        circle.tooltipText = "{name}: [bold]{value}[/]";


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

    render() {
        return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        );

    }
}

export default Statistics;