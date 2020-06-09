import React, { Component } from 'react';
import "./worldmap.styles.css";
import { connect } from 'react-redux';
import { confirmedHistory, deathsHistory, recoveredHistory } from '../redux/actions/worldMapAction';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";



class WorldMap extends Component {

    state = {
        color: "#03a9f4",
        border: "#000051",
    }

    chartMaker() {
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        let worldMap = this.props.history;


        let mapData = [];

        worldMap.forEach(country => {
            mapData.push({
                id: country.country_code,
                name: country.country,
                value: country.latest,
                color: this.state.color
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
        circle.stroke = am4core.color(this.state.border);


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
        this.props.confirmedData(this.props.worldmap);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        console.log('maphsislfjla', this.props.history);
        this.chartMaker();

        return (
            <div className="map">

                <div className="header">
                    <h1>World Affected Nations by Covid-19</h1>
                </div>
                <div className="buttons">
                    <button className="button blueButton" onClick={
                        () => {
                            this.props.confirmedData(this.props.worldmap);
                            this.setState({ color: "#03a9f4", border: "#000051" });
                        }

                    }>Confirmed</button>
                    <button className="button redButton" onClick={() => {
                        this.props.deathsData(this.props.worldmap);
                        this.setState({ color: "#f44336", border: "#ba000d" });
                    }}>Deaths</button>
                    <button className="button greenButton" onClick={() => {
                        this.props.recoveredData(this.props.worldmap);
                        this.setState({ color: "#4caf50", border: "#005005" });
                    }}>Recovered</button>
                </div>

                <div id="chartdiv" ></div>

            </div>
        );

    }
}

const mapStateToProps = state => ({
    history: state.map.history,
    worldmap: state.country.data

});

const mapDispatchToProps = dispatch => ({
    confirmedData: (data) => dispatch(confirmedHistory(data)),
    deathsData: (data) => dispatch(deathsHistory(data)),
    recoveredData: (data) => dispatch(recoveredHistory(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);