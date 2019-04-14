'use strict';

$(document).ready(function () {
    var clock;
    clock = $('.clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
            stop: function stop() {
                $('.message').html('The clock has stopped!');
            }
        }
    });

    clock.setTime(220880);
    clock.setCountdown(true);
    clock.start();
});
"use strict";

var myMap;
ymaps.ready(init); // Ожидание загрузки API с сервера Яндекса
function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64], // Координаты центра карты
        zoom: 10 // Zoom
    });
}
'use strict';

// var linkNav = document.querySelectorAll('[href^="#"]'),
//     V = 0.3;
// for (var i = 0; i < linkNav.length; i++) {
//     linkNav[i].addEventListener('click', function (e) {
//         e.preventDefault();
//         var w = window.pageYOffset,
//             hash = this.href.replace(/[^#]*(.*)/, '$1');
//         t = document.querySelector(hash).getBoundingClientRect().top,
//             start = null;
//         requestAnimationFrame(step);
//         function step(time) {
//             if (start === null) start = time;
//             var progress = time - start,
//                 r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
//             window.scrollTo(0, r);
//             if (r != w + t) {
//                 requestAnimationFrame(step)
//             } else {
//                 location.hash = hash
//             }
//         }
//     }, false);
// }
$(function () {
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();

        var sc = $(this).attr("href"),
            dn = $(sc).offset().top;
        $('html, body').animate({ scrollTop: dn }, 1000);
    });
});
'use strict';

var rate_page = document.querySelector('.rate-page');
var link = document.querySelector('.traid-in__down-block-link');

link.addEventListener('click', function (e) {
    e.preventDefault();
    rate_page.classList.add('is-active');
});

var closes = document.querySelectorAll('.close');
Array.prototype.forEach.call(closes, function (close) {
    close.addEventListener('click', function (e) {
        rate_page.classList.remove('is-active');
        pricPage.classList.remove('is-active');
        offerPage.classList.remove('is-active');
        testDrivePage.classList.remove('is-active');
    });
});

rate_page.addEventListener('click', function (e) {
    if (e.target === rate_page) {
        rate_page.classList.remove('is-active');
    }
});

var pricPage = document.querySelector('.price-page');
var priceLinks = document.querySelectorAll('.cars__price-link');

Array.prototype.forEach.call(priceLinks, function (priceLink) {
    priceLink.addEventListener('click', function (e) {
        e.preventDefault();
        pricPage.classList.add('is-active');
    });
});

pricPage.addEventListener('click', function (e) {
    if (e.target === pricPage) {
        pricPage.classList.remove('is-active');
    }
});

var offerPage = document.querySelector('.offer-page');
var offerModelLink = document.querySelector('.models__offer-link');
var offerLinks = document.querySelectorAll('.spec-offer__link');
var unicLink = document.querySelector('.unic-offer-down__link');

Array.prototype.forEach.call(offerLinks, function (offerLink) {
    offerLink.addEventListener('click', function (e) {
        e.preventDefault();
        offerPage.classList.add('is-active');
    });
});

offerPage.addEventListener('click', function (e) {
    if (e.target === offerPage) {
        offerPage.classList.remove('is-active');
    }
});

offerModelLink.addEventListener('click', function (e) {
    e.preventDefault();
    offerPage.classList.add('is-active');
});

unicLink.addEventListener('click', function (e) {
    e.preventDefault();
    offerPage.classList.add('is-active');
});

var testDrivePage = document.querySelector('.test-drive-page');
var testDriveLink = document.querySelector('.models__test-drive');

testDriveLink.addEventListener('click', function (e) {
    e.preventDefault();
    testDrivePage.classList.add('is-active');
});

testDrivePage.addEventListener('click', function (e) {
    if (e.target === testDrivePage) {
        testDrivePage.classList.remove('is-active');
    }
});
'use strict';

function cycleSlider() {

    var imagesHolder = $('.banner__img-pic'),
        imagesHolderLength = imagesHolder.length,
        i = 0;

    imagesHolder.each(function (z) {
        $(this).css('z-index', -z);
    });

    var initSlider = function initSlider() {

        if (i == imagesHolderLength) i = 0;

        imagesHolder.eq(i).fadeOut(300, function () {
            imagesHolder.each(function (j) {
                $(this).css('z-index', (imagesHolderLength - j + i) % imagesHolderLength);
            });
            i++;
            $(this).show();
        });
    };

    setInterval(initSlider, 3000);
}

cycleSlider();