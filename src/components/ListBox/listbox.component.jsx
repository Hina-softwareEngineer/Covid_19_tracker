import React from 'react';
import { withRouter } from 'react-router-dom';

const ListBox = ({ countryData, match, history }) => {
    let { country, index } = countryData;

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
};


export default withRouter(ListBox);