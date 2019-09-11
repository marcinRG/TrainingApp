'use strict';
var utils = require('../utils/Observable.utils');
var Router = require('../utils/Router');
var resolver = require('../utils/RouteAndParametersResolver');

function ObservableRouterService() {
    var router = new utils.ObservableWrapper(new Router(resolver));

    function addObserver(observer) {
        router.addObserver(router.observers, observer);
    }

    function init() {
        window.addEventListener('hashchange', function (val) {
            router.routeAndParams = router.getRouteAndParamsFromString(window.location.hash);
        });
    }

    function setInitialRouteAndParams() {
        router.routeAndParams = router.getDefaultValues();
    }

    return {
        setInitialRouteAndParameters: setInitialRouteAndParams,
        addObserver: addObserver,
        run: init
    };
}

module.exports = new ObservableRouterService();
