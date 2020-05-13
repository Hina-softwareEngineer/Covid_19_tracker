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
        let data = this.state;
        console.log(data.data)

        return (
            <div>
                <h1>Hina</h1>
                <h1>Confirmed : {data.confirmed}</h1>
                <h1>Deaths : {data.deaths}</h1>
                <h1>Recovered : {data.recovered}</h1>

            </div>
        );
    }

}

export default ApiChecker;