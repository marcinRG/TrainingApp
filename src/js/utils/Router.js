'use strict';

function Router(routeAndParameterResolver) {
    var resolver = routeAndParameterResolver;
    var routeAndParams = {};

    function getDefaultValues() {
        return {
            route: resolver.getDefaultRoute(),
            params: {}
        };
    }

    function getValuesWhenNotNullArgs(path) {
        var values = resolver.getRouteAndParameters(path);
        if (resolver.isRouteValid(values.route)) {
            return values;
        } else {
            return {
                route: resolver.getErrorRoute(),
                params: {}
            };
        }
    }

    function getRouteAndParamsFromString(str) {
        var path = str.slice(1);
        if ((path === null) || (path === '')) {
            return getDefaultValues();
        } else {
            if (resolver.isPathValid(path)) {
                return getValuesWhenNotNullArgs(path);
            }
        }
    }

    return {
        routeAndParams: routeAndParams,
        getDefaultValues: getDefaultValues,
        getRouteAndParamsFromString: getRouteAndParamsFromString
    };
}

module.exports = Router;
