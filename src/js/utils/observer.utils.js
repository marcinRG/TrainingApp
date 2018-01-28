'use strict';

function ObserversList() {
    this.observerList = [];
}

ObserversList.prototype.add = function (observer) {
    if (canWatch(observer)) {
        this.observerList.push(observer);
    }
};

ObserversList.prototype.notify = function (context) {
    this.observerList.forEach(function (value) {
        value.update(context);
    });
};

function canWatch(observer) {
    if (observer && observer.update && observer.update instanceof Function) {
        return true;
    }
    return false;
}

function addPropertyGetterSetter(propertyName, origin, copy) {
    Object.defineProperty(copy, propertyName, {
        get: function () {
            return origin[propertyName];
        },
        set: function (y) {
            origin[propertyName] = y;
        }
    });
}

function Observable() {
    this.observerList = new ObserversList();
}

Observable.prototype.observeProperty = function (propertyName, ObjectToObserve) {
    this._originObject = ObjectToObserve;
    if (ObjectToObserve.hasOwnProperty(propertyName)) {
        addPropertyGetterSetter(propertyName, this._originObject, this);
    }
};

Observable.prototype.observeAllProperties = function (ObjectToObserve) {
    this._originObject = ObjectToObserve;
    for (var name in ObjectToObserve) {
        if (ObjectToObserve.hasOwnProperty(name)) {
            addPropertyGetterSetter(name, this._originObject, this);
        }
    }
};

Observable.prototype.addObserver = function (observer) {
    this.observerList.add(observer);
};

module.exports = Observable;
