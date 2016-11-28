const moment = require('moment');
require('moment-duration-format');
const _ = require('lodash');


const d3 = require('d3-scale');

const data = require('./firedata.json');

const maxBrightness = Math.max(...data.map(d => d.brightness));
const minBrightness = Math.min(...data.map(d => d.brightness));

const scale = d3.scaleLinear()
    .domain([minBrightness, maxBrightness])
    .range([120, 240]);


const NOW = moment();

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = (latitude, longitude) => {
    const result = data.map((d) => {
        const duration = moment.duration(scale(d.brightness), 'seconds');
        const distance = getDistanceFromLatLonInKm(latitude, longitude, d.latitude, d.longitude);
        return {
            distance: distance,
            distanceFixed: distance.toFixed(2),
            days: NOW.diff(moment(d.acq_date), 'days'),
            brightness: d.brightness,
            time: scale(d.brightness),
            minutes: duration.format()
        };
    });

    return _.sortBy(result, 'distance')[0];
};
