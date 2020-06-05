import React, { Component } from 'react';

class List extends Component {

    state = {
        data: {},
        history: {},
        history2: {},
        history3: {},
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
                    history: result["confirmed"]["locations"],
                    history2: result["recovered"]["locations"],
                    history3: result["deaths"]["locations"],
                    confirmed: res["confirmed"],
                    deaths: res["deaths"],
                    recovered: res["recovered"]
                });


                let histories1 = this.state.history;
                let histories2 = this.state.history2;
                let histories3 = this.state.history3;


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

                console.log(arr);

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

                console.log(arr);
            })
    }

    render() {
        return (


            < div >
                <div>hello</div>
                <div>bye bye</div>
            </div >
        );
    }
}

export default List;