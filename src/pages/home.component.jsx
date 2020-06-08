import React, { Component } from 'react';
import { connect } from 'react-redux';
import Statistics from '../components/statistics/statistics.component'
import PieChart from '../components/PieChart/piechart.components';
import WorldMap from "../components/worldMap/worldmap.component";
import WorldList from '../components/WorldList/worldlist.component';


class Home extends Component {

    render() {

        return (

            <div>
                <Statistics stats={this.props.data} />

                {/* <div className="map">
                    <WorldMap />
                </div>

                <div className="container">
                    <PieChart />
                    <WorldList />
                </div> */}
            </div>);
    }
}

const mapStateToProps = state => ({
    data: state.country.data,
});


export default connect(mapStateToProps, null)(Home);