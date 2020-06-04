import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



am4core.useTheme(am4themes_animated);
// Themes end

class World extends Component {
    state = {
        data: {},
        history: {},
        mapChart: null,
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
                    mapChart: result["confirmed"]["locations"],
                    confirmed: res["confirmed"],
                    deaths: res["deaths"],
                    recovered: res["recovered"]
                });



                let chart = am4core.create("chartdiv", am4maps.MapChart);

                let title = chart.titles.create();
                title.text = "CoronaVirus";
                title.textAlign = "middle";

                let worldMap = this.state.mapChart;
                let mapData = [];

                worldMap.forEach(country => {
                    mapData.push({
                        id: country.country_code,
                        name: country.country,
                        value: country.latest,
                        color: "purple"
                    });
                });

                console.log(worldMap);


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
            })
    }

    render() {
        let results = this.state;
        console.log(results.data)


        return (
            <div>
                <h1>Hina</h1>

                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>


            </div>
        );
    }

}

export default World;

