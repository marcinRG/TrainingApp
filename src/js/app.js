'use strict';

var PathAndParametersResolver = require('./utils/PathAndParametersResolver');
var Settings = require('./settings/app.settings');

var resolver = new PathAndParametersResolver(Settings.routeSettings);
window.addEventListener('hashchange', function (val) {
    var path = window.location.hash.slice(1);
    console.log(path);
    if (!path) {
        console.log('not path');
    }
    console.log(resolver.isPathValid(path));
});

// var router = require('./services/router.service');
// //console.log(router);
// router.addRoute('/last-week');
// router.addRoute('/last-training');
// router.addRoute('/achievements');
// router.addRoute('/friends');
// router.addRoute('/settings');
//
// var observer = {
//     update: function (value) {
//         console.log('updated');
//         console.log(value.selectedRoute);
//         console.log(value.routeParams);
//     }
// };
// router.addObserver(observer);
// require('./graphs/graphs');
// require('./graphs/d3tests');
