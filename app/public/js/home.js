import 'babel-polyfill';

import $ from 'jquery';
import Quenda from 'quenda';
import Handlebars from 'handlebars';

const intro = Quenda.new();

const $pan = $('.pan');
const $sirenas = $('audio');
const $title = $('.title');
const $logo = $('.logo');
const $def = $('.def');
const $ask = $('.ask');
const $geoyes = $('.geoyes');
const $geono = $('.geono');

const geoYesTemplate = Handlebars.compile($geoyes.html());

$(document).on('click', (e) => console.log(e.target));

const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function(position) {
            $.ajax({
                    url: '/geo/',
                    method: 'POST',
                    data: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
                .done(data => resolve(data))
                .fail(error => reject(error));
        });
    });
};

intro.add([{
    nextDelay: 1000
}, {
    nextDelay: 3000,
    fn: () => $pan.addClass('active')
}, {
    nextDelay: 2000,
    fn: () => $sirenas.get(0).play()
}, {
    nextDelay: 4000,
    fn: () => $title.addClass('in')
}, {
    nextDelay: 1000,
    fn: () => {
        $pan.addClass('out');
        $title.removeClass('in').addClass('out');
        $sirenas.animate({
            volume: 0
        }, 2000);
    }
}, {
    nextDelay: 3000,
    fn: () => $logo.addClass('in')
}, {
    nextDelay: 1000,
    fn: () => {
        $logo.find('h1').addClass('in');
    }
}, {
    nextDelay: 1000,
    fn: () => {
        $logo.find('h2').addClass('in');
    }
}, {
    nextDelay: 5000,
    fn: () => {
        $logo.find('p').addClass('in');
    }
}, {
    nextDelay: 7000,
    fn: () => {
        $logo.removeClass('in').addClass('out');
        $logo.find('p').removeClass('in').addClass('out');
        $logo.find('h2').removeClass('in').addClass('out');
        $logo.find('h1').removeClass('in').addClass('out');
        $def.addClass('in');
    }
}, {
    nextDelay: 1000,
    fn: () => {
        $def.removeClass('in').addClass('out');
        $ask.addClass('in');
    }
}, {
    fn: () => {
        if ('geolocation' in navigator) {

            $ask.find('button').on('click', (e) => {
                e.preventDefault();
                const $button = $(e.target);

                if ($button.is('[data-yes]')) {
                    getLocation()
                        .then(data => {
                            $ask.removeClass('in').addClass('out');
                            $geoyes.addClass('in').css({
                                'pointer-events': 'auto'
                            });;
                            $geoyes.html(geoYesTemplate(data));

                            $geoyes.find('button').on('click', (e) => {
                                e.preventDefault();
                                location = `/doc/${data.time}`;
                            });
                        });

                } else {
                    $ask.removeClass('in').addClass('out');
                    $geono.addClass('in').css({
                        'pointer-events': 'auto'
                    });
                    $geono.find('button').on('click', (e) => {
                        e.preventDefault();
                        location = '/doc/0';
                    });

                }
            });
        } else {
            $ask.removeClass('in').addClass('out');
            $geono.addClass('in');

            $geono.find('button').on('click', (e) => {
                e.preventDefault();
                location = '/doc/0';
            });

        }
    }
}]);

intro.play();

setTimeout(() => $pan.addClass('active'), 200);
