'use strict';
var utils = require('../utils/Observable.utils');
var Router = require('../utils/Router');

function ObservableRouter() {
    this.router = new utils.ObservableWrapper(new Router());
    this.intialize = function () {
        utils.extend(this, this.router);
        window.addEventListener('hashchange', this.getRouteAndParams);
    };
    this.intialize();
}

module.exports = new ObservableRouter();
