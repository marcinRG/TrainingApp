'use strict'

function PathAndParametersResolver(settings) {
    var routes = settings.routes;
    var defaultRoute = settings.defaultRoute;
    var regEx = /(\/\S*?)+(?:\/?$)/;

    function isPathValid(path) {
        var result = regEx.test(path);
        return result;
    }

    function getRoute(path) {
        console.log('get Route');
    }

    function getParameters(path) {
        console.log('get Parameters');
    }

    function getRouteAndParameters(path) {
        getRoute(path);
        getParameters(path);
    }

    return {
        isPathValid: isPathValid,
        getPathAndParameters: getRouteAndParameters
    }
}

module.exports = PathAndParametersResolver;
