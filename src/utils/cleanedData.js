

const cleanedData = (country) => {
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