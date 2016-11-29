import 'babel-polyfill';
import $ from 'jquery';

const $states = $('.state');
const $counter = $('.counter');
const $doc = $('.doc-content');
const $preload = $('.preload');
const totalTime = $counter.data('time');
let initial = true;

let currentState = 0;

const playState = () => {
    const $state = $states.eq(currentState);

    if (initial) {
        $doc.removeClass('hidden');
        $preload.addClass('out');
        $counter.find('.bar').css({
            'width': '100vw',
            'transition': `width ${totalTime}s linear`
        });
        !initial;
    }

    if (!$state.length) {
        location = '/end/' + totalTime;
        return;
    }
    const time = $state.data('time');
    const $slides = $state.find('.slide');
    const $backgroundMusic = $state.find('[data-background]');

    $backgroundMusic.get(0).volume = 0;
    $backgroundMusic.get(0).play();

    $backgroundMusic.animate({
        volume: 1
    }, 1000);

    $state.removeClass('out').addClass('in');

    const timePerSlide = (time / $slides.length) * 1000;

    let currentSlide = 0;

    const playSlide = () => {
        const $slide = $slides.eq(currentSlide);

        if (!$slide.length) {
            $backgroundMusic.animate({
                volume: 0
            }, 1);

            $state.removeClass('in').addClass('out');
            currentState++;
            return playState();
        }

        $slide.removeClass('out').addClass('in');

        const $slideVideo = $slide.find('video');
        const $slideAudio = $slide.find('audio');

        if ($slideVideo.length) $slideVideo.get(0).play();
        if ($slideAudio.length) $slideAudio.get(0).play();

        setTimeout(() => {
            if ($slideVideo.length) $slideVideo.get(0).pause();
            if ($slideAudio.length) $slideAudio.get(0).pause();
            $slide.removeClass('in').addClass('out');

            currentSlide++;
            playSlide();
        }, timePerSlide);
    };

    playSlide();
};

const $videos = $('video');
const $percent = $('.percent');
const totalVideos = $videos.length;
let loaded = 0;

$videos.on('canplay', (e) => {
    loaded++;

    $percent.text(Math.ceil(loaded * 100 / totalVideos));

    if(loaded === totalVideos) {
        $percent.text(100);
        playState();
    }
});
