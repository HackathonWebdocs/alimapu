'use strict';

const path = require('path');
const _ = require('lodash');

/**
 * Envs
 */

//TODO: simplify this
const development = require('./env/development');
const production = require('./env/production');

/**
 * Default config
 */

const defaults = {
    root: path.join(__dirname, '..'),
    info: {
        image: '/static/img/image.jpg',
        description: 'Alimapu. Tierra quemada',
        name: 'Alimapu'
    },
    i18n: {
        locales: ['es'],
        defaultLocale: 'es',
        directory: path.join(__dirname, 'locales'),
        syncFiles: true,
        cookie: 'i18n'
    }
};


module.exports = {
    development: _.merge(development, defaults),
    production: _.merge(production, defaults)
}[process.env.NODE_ENV || 'development'];