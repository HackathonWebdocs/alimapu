'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Load development config stored in dev.env.json
 */

const devConfig = path.join(__dirname, 'dev.env.json');

if (fs.existsSync(devConfig)) {
    const env = JSON.parse(fs.readFileSync(devConfig));
    for (let key of Object.keys(env)) {
        process.env[key] = env[key];
    }
}

module.exports = {
    info: {
        url: process.env.URL
    },
    env: 'development',
    secret: process.env.SECRET
};