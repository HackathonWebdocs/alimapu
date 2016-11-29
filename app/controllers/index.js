'use strict';


// const wrap = require('co-express');
const _ = require('lodash');

const processDistance = require('../lib/geo');
const content = require('../lib/contentdata');

const getSampleContent = (status = 'antes', size = 10) => {
    return _.sampleSize(_.filter(content, {
        estado: status
    }), size);
};

/**
 * Home
 */

module.exports = (app) => {

    return {
        index: (req, res) => {
            return res.render('home', {
                layout: 'main',
                app: 'home',
                meta: {
                    title: 'Bienvenida - Alimapu. Tierra quemada.'
                }
            });
        },
        geo: (req, res) => {
            return res.json(processDistance(req.body.latitude, req.body.longitude));
        },
        doc: (req, res) => {
            const time = req.params.time === '0' ? 120 : Number(req.params.time);
            const [beforeTime, duringTime, afterTime] = [time * .25, time * .5, time * .25];

            const result = {
                totalTime: time,
                before: {
                    time: beforeTime,
                    selection: getSampleContent('antes', 5)
                },
                during: {
                    time: duringTime,
                    selection: getSampleContent('durante', 25)
                },
                after: {
                    time: afterTime,
                    selection: getSampleContent('despues', 5)
                }
            };

            return res.render('doc', {
                layout: 'main',
                app: 'doc',
                content: result,
                meta: {
                    title: 'Documental aleatorio - Alimapu. Tierra quemada.'
                }
            });

        },
        end: (req, res) => {
            return res.render('end', {
                layout: 'main',
                app: 'end',
                time: req.params.time,
                meta: {
                    title: 'Final - Alimapu. Tierra quemada.'
                }
            });
        },
        credits: (req, res) => {
            return res.render('credits', {
                layout: 'main',
                app: 'credits',
                meta: {
                    title: 'Créditos - Alimapu. Tierra quemada.'
                }
            });
        }
    };


};
