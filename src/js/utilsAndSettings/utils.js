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
    return (dateAsString && Date.parse(dateAsString) !== Number.NaN);
}
