export function changeData(fieldName, fieldValue, previous, callback) {
    const newData = {...previous, [fieldName]: fieldValue};
    callback(newData);
}

export function getElementClass(check, className, classAdditionalText) {
    if (check) {
        return `${className} ${classAdditionalText}`;
    }
    return className;
}

export function getDateString(dateAsString, separator) {
    if (validDate(dateAsString)) {
        const newDate = new Date(dateAsString);
        const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(newDate);
        const month = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(newDate);
        const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(newDate);
        return `${year}${separator}${month}${separator}${day}`;
    }
}

export function validDate(dateAsString) {
    return (dateAsString && !Number.isNaN(Date.parse(dateAsString)));
}

export function objectPropertiesToArray(object) {
    let values = [];
    if (object) {
        values = Object.values(object);
    }
    return values;
}

export function arrayPropertiesToObject(array) {
    let values = {};
    if (array && array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            values['val' + i] = array[i];
        }
    }
    return values;
}

export function sortByDateDesc(value1, value2) {
    if (value1.hasOwnProperty('date') && value2.hasOwnProperty('date')) {
        if (value1.date > value2.date) {
            return -1;
        }
        if (value1.date < value2.date) {
            return 1;
        }
        return 0;
    }
}

