const instances = require('express').Router();

const checkAvailability = require('./checkAvailability');
const createInstance = require('./createInstance');

instances.route('/name/:instance')
    .get(checkAvailability)
    .all((req, res, next) => { return next(); });

instances.route('/')
    .post(createInstance)
    .all((req, res, next) => { return next(); });

module.exports = instances;