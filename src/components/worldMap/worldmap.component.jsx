import React, { Component } from 'react';
import "./worldmap.styles.css";
import { connect } from 'react-redux';
import { confirmedHistory, deathsHistory, recoveredHistory } from '../../redux/actions/worldMapAction';
import GlobalChart from '../GlobalChart/global-chart.component';


class WorldMap extends Component {

    state = {
        color: "#03a9f4",
        border: "#000051",
    }


    componentDidMount() {
        this.props.confirmedData(this.props.worldmap);
    }


    render() {


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


                    <button className="button redButton" onClick={
                        () => {
                            this.props.deathsData(this.props.worldmap);
                            this.setState({ color: "#f44336", border: "#ba000d" });
                        }
                    }>Deaths</button>


                    <button className="button greenButton" onClick={
                        () => {
                            this.props.recoveredData(this.props.worldmap);
                            this.setState({ color: "#4caf50", border: "#005005" });
                        }
                    }>Recovered</button>
                </div>


                <GlobalChart chartData={this.props.history} color={this.state.color} border={this.state.border} />


            </div >
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