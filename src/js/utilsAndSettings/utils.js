export function changeData(fieldName, fieldValue, previous, callback) {
    const newData = {...previous, [fieldName]: fieldValue};
    callback(newData);
}
