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
