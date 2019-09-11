'use strict';
var routeSettings = require('./../settings/app.settings').routeSettings;

function RouteAndParametersResolver(settings) {
    var routes = settings.routes;
    var defaultRoute = settings.defaultRoute;
    var errorRoute = settings.errorRoute;
    var regEx = /(\/\S*?)+(?:\/?$)/;

    function isPathValid(path) {
        var result = regEx.test(path);
        return result;
    }

    function removeFirstAndLastSlash(str) {
        if ((str) && (str.length > 0)) {
            if (str.charAt(0) === '/') {
                str = str.substring(1, str.length);
            }
            if (str.charAt(str.length - 1) === '/') {
                str = str.substring(0, str.length - 1);
            }
        }
        return str;
    }

    function isRouteValid(route) {
        if (routes && routes.length > 0) {
            return (routes.indexOf(route) >= 0);
        }
        return false;
    }

    function getRouteAndParametersArray(str) {
        var paramsArray = [];
        str = removeFirstAndLastSlash(str);
        if (str && str.length > 0) {
            paramsArray = str.split('/');
        }
        return paramsArray;
    }

    function getRoute(paramsArray) {
        if (paramsArray && paramsArray.length > 0) {
            return paramsArray[0];
        }
        return null;
    }

    function getParameters(paramsArray) {
        var params = {};
        if (paramsArray && paramsArray.length > 2) {
            for (var i = 1; i < paramsArray.length - 1; i = i + 2) {
                params[paramsArray[i]] = paramsArray[i + 1];
            }
        }
        return params;
    }

    function getDefaultRoute() {
        return defaultRoute;
    }

    function getErrorRoute() {
        return errorRoute;
    }

    function getRouteAndParameters(path) {
        var route = defaultRoute;
        var params = {};
        if (isPathValid(path)) {
            var paramsArray = getRouteAndParametersArray(path);
            route = getRoute(paramsArray);
            params = getParameters(paramsArray);
        }
        return {
            route: route,
            parameters: params
        };
    }

    return {
        isPathValid: isPathValid,
        isRouteValid: isRouteValid,
        getDefaultRoute: getDefaultRoute,
        getErrorRoute: getErrorRoute,
        getRouteAndParameters: getRouteAndParameters
    };
}

var resolver = new RouteAndParametersResolver(routeSettings);
module.exports = resolver;
