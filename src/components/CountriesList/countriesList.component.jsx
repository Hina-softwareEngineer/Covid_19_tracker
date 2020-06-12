import React, { Component } from 'react';
import './countriesList.styles.css';
import { connect } from 'react-redux';
import ListBox from '../ListBox/listbox.component';

class CountriesList extends Component {

    state = {
        cleanedData: this.props.cleanedData,
        search: "",
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

                <div className="countryBox">
                    {
                        SearchResult &&
                        SearchResult.map((country, index) =>
                            (
                                <ListBox key={index} countryData={{ country, index }} />
                            ))
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    cleanedData: state.country.cleanedData,

});


export default connect(mapStateToProps, null)(CountriesList);