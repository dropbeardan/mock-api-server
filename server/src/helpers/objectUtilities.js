const excFilterValues = (obj, valuesToRemove) => {
    return Object.keys(obj).reduce((currParams, key) => {
        return valuesToRemove.includes(obj[key]) ?
            { ...currParams } : { ...currParams, [key]: obj[key] };
    }, {});
};

const incFilterKeys = (obj, allowedKeys) => {
    return Object.keys(obj).reduce((currParams, key) => {
        return allowedKeys.includes(key) ?
            { ...currParams, [key]: obj[key] } : { ...currParams };
    }, {});
};

module.exports = {
    excFilterValues,
    incFilterKeys
};