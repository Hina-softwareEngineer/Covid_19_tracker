
const cleanedData = (countries) => {

    let historyConfirmed = countries.confirmed.locations;
    let historyRecovered = countries.recovered.locations;
    let historyDeath = countries.deaths.locations;


    let arr = {};

    for (var i = 0; i < historyConfirmed.length; i++) {
        if (!arr[historyConfirmed[i].country]) {

            arr[historyConfirmed[i].country] = {
                country_code: historyConfirmed[i].country_code,
                province: historyConfirmed[i].province,
                confirmed: historyConfirmed[i].latest,
                deaths: historyDeath[i].latest,
                confirmedHistory: historyConfirmed[i].history,
                deathsHistory: historyDeath[i].history,
            };
        }
        else {
            arr[historyConfirmed[i].country].confirmed += historyConfirmed[i].latest;
            arr[historyConfirmed[i].country].deaths += historyDeath[i].latest;

            for (var dates in historyConfirmed[i].history) {
                arr[historyConfirmed[i].country].confirmedHistory[dates] += historyConfirmed[i].history[dates];
                arr[historyDeath[i].country].deathsHistory[dates] += historyDeath[i].history[dates];
            }
        }
    }



    for (i = 0; i < historyRecovered.length; i++) {
        if (historyRecovered[i].latest) {

            if (arr[historyRecovered[i].country].recovered) {
                arr[historyRecovered[i].country].recovered += historyRecovered[i].latest;
                for (dates in historyRecovered[i].history) {
                    arr[historyRecovered[i].country].recoveredHistory[dates] += historyRecovered[i].history[dates];

                }


            }
            else {
                arr[historyRecovered[i].country] = {
                    ...arr[historyRecovered[i].country], recovered: historyRecovered[i].latest,
                    recoveredHistory: historyRecovered[i].history
                };

            }
        }
        else {
            arr[historyRecovered[i].country] = { ...arr[historyRecovered[i].country], recovered: 0 };
        }
    }



    let names = Object.keys(arr);
    let lastArray = [];
    for (i = 0; i < names.length; i++) {
        lastArray.push({ country: names[i], values: arr[names[i]] });
    }
    return lastArray;
}

export default cleanedData;