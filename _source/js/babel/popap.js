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