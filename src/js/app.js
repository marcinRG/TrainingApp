'use strict';
var router = require('./services/router.service');
console.log(router);
router.addRoute('/last-week');
router.addRoute('/last-training');
router.addRoute('/achievements');
router.addRoute('/friends');
router.addRoute('/settings');

var observer = {
    update: function (value) {
        console.log('updated');
        console.log(value.selectedRoute);
        console.log(value.routeParams);
    }
};
router.addObserver(observer);

//require('./graphs/graphs');
