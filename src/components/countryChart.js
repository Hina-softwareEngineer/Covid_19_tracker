componentDidMount() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/all')
        .then(res => res.json())
        .then(result => {
            let res = result["latest"]
            this.setState({
                data: result,
                history: result["confirmed"]["locations"][0]["history"],
                confirmed: res["confirmed"],
                deaths: res["deaths"],
                recovered: res["recovered"]
            });
            console.log('in fetch', this.state);





            let histories = this.state.history;
            let chart_data = [];
            var i = 0;

            for (var dates in histories) {
                chart_data.push({ date: new Date(dates), name: "names" + i, value: histories[dates], linecolor: "green" });
                i = i + 1;
            }
            console.log('history data: ', chart_data);


            chart.data = chart_data;



            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

            dateAxis.renderer.minGridDistance = 50;
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            valueAxis.renderer.minWidth = 35;

            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";

            series.tooltipText = "{valueY.value} cases";
            chart.cursor = new am4charts.XYCursor();

            series.strokeWidth = 2;
            series.fill = "red";
            chart.colors = "red";

            chart.stroke = am4core.color("green");
            series.stroke = am4core.color("red");

            series.propertyFields.fill = "color";

            series.propertyFields.stroke = "lineColor";
            series.propertyFields.fill = "lineColor";


            this.chart = chart;
        })
}
componentWillUnmount() {
    if (this.chart) {
        this.chart.dispose();
    }
}

render() {
    let results = this.state;
    console.log(results.data)
    console.log(results.history)

    return (
        <div>
            <h1>Hina</h1>
            <h1>Confirmed : {results.confirmed}</h1>
            <h1>Deaths : {results.deaths}</h1>
            <h1>Recovered : {results.recovered}</h1>

            {
                (Object.keys(results.data).length > 1) ?
                    <div><p>Confirmed Last Updated : {results.data.confirmed.last_updated}</p>
                        <p>Confirmed Last Updated : {results.data.deaths.last_updated}</p>
                        <p>Confirmed Last Updated : {results.data.recovered.last_updated}</p>
                    </div>
                    : null
            }

            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>


        </div>
    );
}

}