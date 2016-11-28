import 'babel-polyfill';
import $ from 'jquery';

const $states = $('.state');
const $content = $('.doc-content');
const $counter = $('.counter');
const totalTime = $counter.data('time');

$counter.find('.bar').css({
    'width': '100vw',
    'transition': `width ${totalTime}s linear`

});

let currentState = 0;

const playState = () => {
    const $state = $states.eq(currentState);

    if(!$state.length) {
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

        if(!$slide.length) {
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

        if($slideVideo.length) $slideVideo.get(0).play();
        if($slideAudio.length) $slideAudio.get(0).play();

        setTimeout(() => {
            if($slideVideo.length) $slideVideo.get(0).pause();
            if($slideAudio.length) $slideAudio.get(0).pause();
            $slide.removeClass('in').addClass('out');

            currentSlide++;
            playSlide();
        }, timePerSlide);
    };

    playSlide();
};

setTimeout(() => {
    $content.removeClass('hidden');
    playState();
}, 2000);