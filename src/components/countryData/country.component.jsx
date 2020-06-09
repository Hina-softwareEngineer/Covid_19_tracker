import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Statistics from '../statistics/statistics.component';
import PieChart from '../PieChart/piechart.components';
import Line from '../LineChart/line.component';
import * as am4core from "@amcharts/amcharts4/core";


class Country extends Component {

    render() {
        let AllProps = this.props;
        console.log(AllProps.cleanedData);
        let countryData = AllProps.cleanedData.filter(country => {
            return country.country == this.props.match.params.countryId;
        })
        console.log("countrydata", countryData)
        console.log(countryData[0].values.confirmed);


        return (
            <div>

                <Statistics stats={{
                    confirmed: countryData[0].values.confirmed,
                    deaths: countryData[0].values.deaths,
                    recovered: countryData[0].values.recovered,
                    last_updatedConfirmed: AllProps.data.confirmed.last_updated,
                    last_updatedDeaths: AllProps.data.deaths.last_updated,
                    last_updatedRecovered: AllProps.data.recovered.last_updated
                }} />

                {
                    countryData.length > 0 ?
                        <Line country={countryData} />
                        : "line"
                }

                <PieChart chart={[
                    { country: "Confirmed", cases: countryData[0].values.confirmed, color: am4core.color("#03a9f4") },
                    { country: "Deaths", cases: countryData[0].values.deaths, color: am4core.color("#f44336") },
                    { country: "Recovered", cases: countryData[0].values.recovered, color: am4core.color("#4caf50") }
                ]} heading={"Covid-19 Statistics"} />

            </div>
        );
    }
}

const mapStateToProps = state => ({
    cleanedData: state.country.cleanedData,
    data: state.country.data,
});

export default withRouter(connect(mapStateToProps, null)(Country));


