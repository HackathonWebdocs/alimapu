'use strict';

const $ = require('jquery');

module.exports.preloadMedia = (media, $preloadWidget) => {


    const $bar = $preloadWidget.find('[data-bar]');
    console.log($bar);
    const total = media.length;
    let loaded = 0;

    const updateBar = () => {
        loaded++;
        $bar.css({
            width: parseInt((loaded * 100) / total) + '%'
        });
    };

    const promises = media.map((i) => new Promise((resolve, reject) => {
        if (i.type === 'image') {
            let $image = $('<img>');

            $image.on('load', () => {
                updateBar();
                return resolve(true);
            });

            $image.on('error', (error) => resolve(false));
            $image.attr('src', i.src);

            $image = null;

        } else if (i.type === 'video' || i.type === 'audio') {
            let $media = i.type === 'video' ? $('<video>') : $('audio');

            $media.on('canplaythrough', () => {
                updateBar();
                return resolve(true);
            });

            $media.on('error stalled', () => {
                resolve(false);
            });

            $media.attr({
                preload: 'auto',
                src: i.src,
                controls: 'controls'
            });

            $media = null;
        }
    }));

    return Promise.all(promises);
};