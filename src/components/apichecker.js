import React, { Component } from 'react';


class ApiChecker extends Component {
    state = {
        data: {},
        confirmed: 0,
        deaths: 0,
        recovered: 0
    }

    componentDidMount() {
        fetch('https://coronavirus-tracker-api.herokuapp.com/all')
            .then(res => res.json())
            .then(result => {
                let res = result["latest"]
                this.setState({
                    data: result,
                    confirmed: res["confirmed"],
                    deaths: res["deaths"],
                    recovered: res["recovered"]
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        let results = this.state;
        console.log(results.data)

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


            </div>
        );
    }

}

export default ApiChecker;