'use strict';

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

function extend(obj, extension) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
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

function copyFunction(propertyName, origin, copy, observerList) {
    copy[propertyName] = function (values) {
        var funcResult = origin[propertyName](values);
        observerList.notify(origin);
        return funcResult;
    };
}

function ObservableWrapper(origin) {
    this.originObject = origin;
    this.observers = new ObserversList();
    this.observeAllProperties();
}

ObservableWrapper.prototype.observeAllProperties = function () {
    for (var name in this.originObject) {
        if (this.originObject.hasOwnProperty(name)) {
            if (isFunction(this.originObject[name])) {
                copyFunction(name, this.originObject, this, this.observers);
            } else {
                addPropertyGetterSetter(name, this.originObject, this, this.observers);
            }
        }
    }
};

ObservableWrapper.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

module.exports = {
    ObservableWrapper: ObservableWrapper,
    ObserverList: ObserversList,
    extend: extend
};
