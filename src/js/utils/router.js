'use strict';

function Router() {
    var routes = [];
    var defaultAction = function () {
        console.log('default action not set');
    };

    function getRouteId() {
        return window.location.hash.slice(1);
    }

    function find(txt) {
        for (var i = 0; i < routes.length; i++) {
            var matches = txt.match(routes[i].routeId);
            if (matches && matches[0] === routes[i].routeId) {
                return routes[i];
            }
        }
    }

    function canExecute(func) {
        if (func && func instanceof Function) {
            return true;
        }
        return false;
    }

    function runRouting() {
        var elem = find(getRouteId());
        if (elem) {
            elem.handler();
        }
        else {
            defaultAction();
        }
    }

    function addDefaultAction(handler) {
        if (canExecute(handler)) {
            defaultAction = handler;
        }
    }

    function addRoute(routeId, handler) {
        if (canExecute(handler)) {
            routes.push({
                routeId: routeId,
                handler: handler
            });
        }
    }

    function initialize() {
        window.addEventListener('hashchange', runRouting);
    }

    initialize();
    return {
        addRoute: addRoute,
        addDefaultAction: addDefaultAction
    };
}

module.exports = new Router();
