'use strict';

var router = require('./services/router.service');
router.run();
console.log(router);

var observer = {
    update: function (value) {
        console.log('updated');
        console.log(value.routeAndParams);
    }
};
router.addObserver(observer);
router.setInitialRouteAndParameters();
// require('./graphs/graphs');
// require('./graphs/d3tests');
