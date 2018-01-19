const mongoose = require('mongoose');

const mongoId = (id) => {
    try {
        mongoose.Types.ObjectId(id);
        return true;
    } catch (err) {
        return false;
    }
};

const instance = (instance) => {
    const illegalNames = [
        '',
        'endpoints',
        'instances',
        'resources',
        'sessions'
    ];

    return instance && !illegalNames.includes(instance);
};

module.exports = {
    mongoId,
    instance
};