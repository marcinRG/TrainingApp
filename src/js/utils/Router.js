'use strict';

function Router() {
    this.routes = [];
    this.routeParams = [];
    this.selectedRoute = '';

    this.getRouteAndParams = function() {
        var str = window.location.hash.slice(1);
        this.selectedRoute = this.findRoute(str);
        this.routeParams = this.findRouteParams(str);
    };

    this.findRoute = function(str) {
        var reqEx = /(\/.*?)(?:\/|$)/;
        var found = str.match(reqEx);
        if (found && found.length > 1) {
            return found[1];
        }
    };

    this.findRouteParams = function(str) {
        var params = str.split('/');
        //removes first empty val and route
        params.shift();
        params.shift();
        return params;
    };

    this.addRoute = function(routeId) {
        this.routes.push({
            routeId: routeId
        });
    };
}

module.exports = Router;
