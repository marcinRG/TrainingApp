'use strict';

function extend(obj, extension) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

function ObserversList() {
    this.observers = [];
}

ObserversList.prototype.add = function (observer) {
    if (canWatch(observer)) {
        this.observers.push(observer);
    }
};

ObserversList.prototype.notify = function (context) {
    this.observers.forEach(function (value) {
        value.update(context);
    });
};

function canWatch(observer) {
    if (observer && observer.update && observer.update instanceof Function) {
        return true;
    }
    return false;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function addPropertyGetterSetter(propertyName, origin, copy, observerList) {
    Object.defineProperty(copy, propertyName, {
        get: function () {
            return origin[propertyName];
        },
        set: function (y) {
            origin[propertyName] = y;
            observerList.notify(origin);
        }
    });
}

function copyFunction(propertyName, origin, copy) {
    if (origin.hasOwnProperty(propertyName)) {
        copy[propertyName] = origin[propertyName];
    }
}

ObservableWrapper.prototype.observeAllProperties = function (origin, wrapper, observerList) {
    for (var name in origin) {
        if (origin.hasOwnProperty(name)) {
            if (isFunction(origin[name])) {
                copyFunction(name, origin, wrapper);
            } else {
                addPropertyGetterSetter(name, origin, wrapper, observerList);
            }
        }
    }
};

function ObservableWrapper(origin) {
    this.originObject = origin;
    this.observers = new ObserversList();
    this.observeAllProperties(this.originObject, this, this.observers);
}

ObservableWrapper.prototype.addObserver = function (observerlist, observer) {
    observerlist.add(observer);
};

module.exports = {
    ObservableWrapper: ObservableWrapper,
    ObserverList: ObserversList,
    extend: extend
};
