const invocations = require('express').Router();

const invokeRoute = require('./invokeRoute');

invocations.route('/:instance/*')
    .all(invokeRoute);

module.exports = invocations;