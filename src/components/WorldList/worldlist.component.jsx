import React, { Component } from 'react';
import './worldlist.styles.css';

class WorldList extends Component {

    state = {
        data: this.props.data,
        arr1: null
    }

    displayList() {
        let histories1 = this.state.data.confirmed.locations;
        let histories2 = this.state.data.recovered.locations;
        let histories3 = this.state.data.deaths.locations;


        let arr = {};

        for (var i = 0; i < histories1.length; i++) {
            if (!arr[histories1[i].country]) {

                arr[histories1[i].country] = {
                    country_code: histories1[i].country_code,
                    province: histories1[i].province,
                    confirmed: histories1[i].latest,
                    deaths: histories3[i].latest,
                };
            }
            else {
                arr[histories1[i].country].confirmed += histories1[i].latest;
                arr[histories1[i].country].deaths += histories3[i].latest;
            }
        }



        for (var i = 0; i < histories2.length; i++) {
            if (histories2[i].latest) {

                if (arr[histories2[i].country].recovered) {
                    arr[histories2[i].country].recovered += histories2[i].latest;
                }
                else {
                    arr[histories2[i].country] = { ...arr[histories2[i].country], recovered: histories2[i].latest };

                }
            }
            else {
                arr[histories2[i].country] = { ...arr[histories2[i].country], recovered: 0 };
            }
        }

        let names = Object.keys(arr);
        let lastArray = [];
        for (var i = 0; i < names.length; i++) {
            lastArray.push({ country: names[i], values: arr[names[i]] });
        }
        this.setState({
            arr1: lastArray,
        });

        console.log("last array", lastArray);
    }

    componentDidMount() {
        this.displayList();
    }

    render() {
        return (
            <div className="countriesList">
                {
                    this.state.arr1 &&
                    this.state.arr1.map((country, index) => {
                        return (
                            <div key={index} id="country" className="countryData">
                                <div className="names">
                                    <h3>{country.country}</h3>
                                    <h6>
                                        <span>{country.values.confirmed} Confirmed
                                        </span>
                                    &nbsp;&&nbsp;
                                <span>{country.values.deaths} Deaths</span></h6>
                                </div>

                                <div className="codes">
                                    <h6>{country.values.country_code}</h6>
                                    <h6>{country.values.recovered} Recovered</h6>

                                </div>

                            </div>
                        );
                    })
                }
            </div>
        );
    }

}

export default WorldList;