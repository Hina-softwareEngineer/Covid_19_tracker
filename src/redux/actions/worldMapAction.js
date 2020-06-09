import {
    CONFIRMED_MAP,
    DEATHS_MAP,
    RECOVERED_MAP
} from '../types/types';


export const confirmedHistory = (Data) => (
    {
        type: CONFIRMED_MAP,
        data: Data.confirmed.locations
    }
);


export const deathsHistory = (Data) => (
    {
        type: DEATHS_MAP,
        data: Data.deaths.locations
    }
);

export const recoveredHistory = (Data) => (
    {
        type: RECOVERED_MAP,
        data: Data.recovered.locations
    }
);