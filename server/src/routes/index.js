const routes = require('express').Router();

const endpoints = require('./endpoints');
const frontEnd = require('./frontEnd');
const instances = require('./instances');
const invocations = require('./invocations');
const resources = require('./resources');
const sessions = require('./sessions');

// Normal Routes.
routes.use('/endpoints', endpoints);
routes.use('/instances', instances);
routes.use('/resources', resources);
routes.use('/sessions', sessions);
routes.use('/', invocations);

// Non-API Route, to be handled by Statics.
routes.use('/', frontEnd);

// Error Route.
routes.route('*')
    .all((req, res) => {
        return res
            .status(404)
            .json({
                message: 'Not Found.'
            });
    });

module.exports = routes;