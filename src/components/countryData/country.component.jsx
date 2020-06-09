import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Statistics from '../statistics/statistics.component';
import PieChart from '../PieChart/piechart.components';
import Line from './line.component';


class Country extends Component {



    lineGraph(country) {


        // chart code


        console.log(country);


    }

    render() {
        let AllProps = this.props;
        console.log(AllProps.cleanedData);
        let countryData = AllProps.cleanedData.filter(country => {
            return country.country == this.props.match.params.countryId;
        })
        console.log("countrydata", countryData)
        console.log(countryData[0].values.confirmed);
        // this.lineGraph(countryData);

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

                {/* <div className="boxes">
                <Statistics stats={this.state.search[0].values.confirmed} name="Confirmed" color="blue" />
                <Statistics stats={this.state.search[0].values.deaths} name="Deaths" color="red" />
                <Statistics stats={this.state.search[0].values.recovered} name="Recovered" color="green" />
            </div>
            :
            "statistics " */}


                {
                    countryData.length > 0 ?


                        <Line country={countryData} />
                        : "line"}
                {/* <div className="map">
                    {
                        states.data ? <WorldMap data={states.data} /> : null
                    }

                </div> */}
                <PieChart chart={[
                    {
                        country: "confirmed", cases: countryData[0].values.confirmed,
                    },
                    { country: "Deaths", cases: countryData[0].values.deaths, },
                    {
                        country: "Recovered", cases: countryData[0].values.recovered,
                    }]} />
                {/* <div className="container">

                    {
                        states.data ? <PieChart data={states.data.confirmed} /> : null
                    }

                    {
                        states.data ? <WorldList data={states.data} /> : null
                    } 

                </div> */}


            </div>
        );
    }
}

const mapStateToProps = state => ({
    cleanedData: state.country.cleanedData,
    data: state.country.data,
});

export default withRouter(connect(mapStateToProps, null)(Country));


