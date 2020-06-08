import React, { Component } from 'react';
import './worldlist.styles.css';
import { withRouter } from 'react-router-dom';

class WorldList extends Component {

    state = {
        data: this.props.data,
        cleanedData: [],
        search: "",
    }

    displayList() {
        let states = this.state.data;
        let historyConfirmed = states.confirmed.locations;
        let historyRecovered = states.recovered.locations;
        let historyDeath = states.deaths.locations;


        let arr = {};

        for (var i = 0; i < historyConfirmed.length; i++) {
            if (!arr[historyConfirmed[i].country]) {

                arr[historyConfirmed[i].country] = {
                    country_code: historyConfirmed[i].country_code,
                    province: historyConfirmed[i].province,
                    confirmed: historyConfirmed[i].latest,
                    deaths: historyDeath[i].latest,
                };
            }
            else {
                arr[historyConfirmed[i].country].confirmed += historyConfirmed[i].latest;
                arr[historyConfirmed[i].country].deaths += historyDeath[i].latest;
            }
        }



        for (var i = 0; i < historyRecovered.length; i++) {
            if (historyRecovered[i].latest) {

                if (arr[historyRecovered[i].country].recovered) {
                    arr[historyRecovered[i].country].recovered += historyRecovered[i].latest;
                }
                else {
                    arr[historyRecovered[i].country] = { ...arr[historyRecovered[i].country], recovered: historyRecovered[i].latest };

                }
            }
            else {
                arr[historyRecovered[i].country] = { ...arr[historyRecovered[i].country], recovered: 0 };
            }
        }

        let names = Object.keys(arr);
        let lastArray = [];
        for (var i = 0; i < names.length; i++) {
            lastArray.push({ country: names[i], values: arr[names[i]] });
        }
        this.setState({
            cleanedData: lastArray,
        });

    }

    componentDidMount() {
        this.displayList();
    }

    SearchInput(e) {
        this.setState({ search: e.target.value }, () => {
        });
    }

    sortByCases = (e) => {
        let options = e.target.value;
        var sortedData;

        if (options == "confirmed") {
            sortedData = [...this.state.cleanedData].sort((a, b) =>
                (a.values.confirmed - b.values.confirmed)
            ).reverse();
        }
        else if (options == "deaths") {
            sortedData = [...this.state.cleanedData].sort((a, b) =>
                (a.values.deaths - b.values.deaths)
            ).reverse();
        }
        else if (options == "recovered") {
            sortedData = [...this.state.cleanedData].sort((a, b) =>
                (a.values.recovered - b.values.recovered)
            ).reverse();
        }

        else {
            sortedData = [...this.state.cleanedData].sort((a, b) => {
                if (a.country < b.country) return 1;
                if (a.country > b.country) return -1;
                return 0;
            }
            ).reverse();
        }

        this.setState({ cleanedData: sortedData });

    }


    render() {

        const { cleanedData, search } = this.state;
        let { match, history } = this.props;

        const SearchResult = cleanedData.filter(country =>
            country.country.toLowerCase().includes(search.toLowerCase()));

        return (
            <div className="countriesList">
                <h1>All Affected Countries Statistics</h1>
                <div className="inputSelect">
                    <input
                        onChange={this.SearchInput.bind(this)}
                        type="text" placeholder="Search by Country Name"
                        value={search}
                        name="country"
                    />

                    <select onChange={this.sortByCases} name="options">
                        <option value="default">Sort By </option>
                        <option value="confirmed">Confirmed Cases</option>
                        <option value="deaths">Deaths Cases</option>
                        <option value="recovered">Recovered Cases</option>
                        <option value="alphabetically">Alphabets (A-Z)</option>
                    </select>
                </div>
                {
                    SearchResult &&
                    SearchResult.map((country, index) => {
                        return (

                            <div key={index} id="country" className="countryData">

                                <div className="names">
                                    <h3 onClick={() => history.push(`${match.path}country/${country.country}`)}>{country.country}</h3>
                                    <h6>
                                        <span>{country.values.confirmed.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Confirmed
                                        </span>
                                    &nbsp;&&nbsp;
                                <span>{country.values.deaths.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Deaths</span></h6>
                                </div>

                                <div className="codes">
                                    <h6>{country.values.country_code}</h6>
                                    <h6>{country.values.recovered.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Recovered</h6>

                                </div>

                            </div>
                        );
                    })
                }
            </div>
        );
    }

}

export default withRouter(WorldList);