import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Gauge extends Component {
    state = {
        data: {},
        history: {},
        history2: {},
        history3: {},
        toptenConfirmed: null,
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
                    history2: result["recovered"]["locations"][0]["history"],
                    history3: result["deaths"]["locations"][0]["history"],
                    toptenConfirmed: result["confirmed"]["locations"],
                    confirmed: res["confirmed"],
                    deaths: res["deaths"],
                    recovered: res["recovered"]
                });



                let toptenCountries = this.state.toptenConfirmed;
                // console.log(toptenCountries[0]);
                // console.log(toptenCountries);

                // console.log(this.state.confirmed);
                // for (var i = 0; i < toptenCountries.length; i++) {
                //     if (!array.includes(toptenCountries[i].country)) {
                //         array.push({ country: toptenCountries[i].country, province: toptenCountries[i].province, litres: (toptenCountries[i].latest * 100 / this.state.confirmed) });
                //     }
                //     else {
                //         let index = array.indexOf(toptenCountries[i].country);
                //         let arr = array[index];
                //         arr.litres += toptenCountries[i].litres;
                //     }

                // }



                let arr = {}; for (var i = 0; i < toptenCountries.length; i++) {
                    if (!arr[toptenCountries[i].country]) {
                        arr[toptenCountries[i].country] = toptenCountries[i].latest
                    }
                    else {
                        arr[toptenCountries[i].country] += toptenCountries[i].latest;
                    }
                }
                console.log("sum of allr", arr);

                // toptenCountries.foreach((country) => {
                //     array.push({ country: country.country, litres: (country.latest / this.state.confirmed) * 100 });
                // });
                // console.log(array);

                var chart = am4core.create("chartdiv", am4charts.PieChart);

                // Add data
                // let data = Object.keys(arr);
                let array = [];
                for (var data in arr) {

                    array.push({ country: data, cases: arr[data] });
                }
                console.log("1", array);
                // array.sort();
                let a = array.sort(function (a, b) { if (a.cases < b.cases) return 1; if (a.cases > b.cases) return -1; return 0 });

                console.log(a);

                data = array.filter((country, index) => {
                    if (index < 10) {
                        return country;
                    }

                });



                chart.data = data;
                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "cases";
                pieSeries.dataFields.category = "country";
                pieSeries.slices.template.stroke = am4core.color("#fff");
                pieSeries.slices.template.strokeWidth = 2;
                pieSeries.slices.template.strokeOpacity = 1;

                // This creates initial animation
                pieSeries.hiddenState.properties.opacity = 1;
                pieSeries.hiddenState.properties.endAngle = -90;
                pieSeries.hiddenState.properties.startAngle = -90;

            })

    }

    render() {
        return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>

        );
    }
}

export default Gauge;