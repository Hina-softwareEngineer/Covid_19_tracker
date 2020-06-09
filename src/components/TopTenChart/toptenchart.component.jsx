import React from 'react';
import { connect } from 'react-redux';
import PieChart from '../PieChart/piechart.components';

class ChartPie extends React.Component {

    GatheringData() {
        let toptenCountries = this.props.data.locations;


        let cleaningData = {};
        // Removing countries having Provinces and adding total cases of those countries
        for (var i = 0; i < toptenCountries.length; i++) {
            if (!cleaningData[toptenCountries[i].country]) {
                cleaningData[toptenCountries[i].country] = toptenCountries[i].latest
            }
            else {
                cleaningData[toptenCountries[i].country] += toptenCountries[i].latest;
            }
        }

        let chartData = [];
        for (var data in cleaningData) {
            chartData.push({ country: data, cases: cleaningData[data] });
        }

        // sorting data in descending order
        chartData.sort(function (a, b) { if (a.cases < b.cases) return 1; if (a.cases > b.cases) return -1; return 0 });

        let others = 0;
        let Finaldata = chartData.filter((country, index) => {
            if (index < 10) {
                return country;
            }
            if (index > 9) {
                others += country.cases
            }
        });

        Finaldata.push({ country: "Other", cases: others });

        return Finaldata;
    }

    render() {
        return (

            <PieChart chart={this.GatheringData()} heading={"Most Affected Countries"} />
        )
    }
};

const mapStateToProps = state => ({
    data: state.country.data.confirmed,

});



export default connect(mapStateToProps, null)(ChartPie);