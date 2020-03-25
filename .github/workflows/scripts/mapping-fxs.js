const normalize = require('./data-normalization');

module.exports.headers = ['Province/State', 'Country/Region', 'Last Update', 'Confirmed', 'Deaths', 'Recovered', 'Latitude', 'Longitude', '03-01-2020'];

module.exports.fxMap = {

    '03-01-2020': (_case, date) => {
        return [
            //Province/State
            _case['0'],

            //Country/Region
            normalize.country(_case['1']),

            //Last Update 
            '2020-01-01',

            //Confirmed
            _case['3'],

            //Deaths
            _case['4'],

            //Recovered
            _case['5'],

            //Latitude
            _case['6'],

            //Longitude
            _case['7'],

            //03-01-2020
            date,
        ];
    },

    '03-22-2020': (_case, date) => {
        return [
            //Province/State
            _case['2'],

            //Country/Region
            normalize.country(_case['3']),

            //Last Update 
            '2020-01-01',

            //Confirmed
            _case['7'],

            //Deaths
            _case['8'],

            //Recovered
            _case['9'],

            //Latitude
            _case['5'],

            //Longitude
            _case['6'],

            //03-01-2020
            date,
        ];
    }
}