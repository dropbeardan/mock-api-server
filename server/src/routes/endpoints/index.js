const endpoints = require('express').Router();

const validateToken = require('../middlewares/validateToken');

const createEndpoint = require('./createEndpoint');
const deleteEndpoint = require('./deleteEndpoint');
const getEndpoint = require('./getEndpoint');
const listEndpoints = require('./listEndpoints');
const updateEndpoint = require('./updateEndpoint');

endpoints.use(validateToken);

endpoints.route('/')
    .get(listEndpoints)
    .post(createEndpoint)
    .all((req, res, next) => {
        return next();
    });

endpoints.route('/:endpointId')
    .get(getEndpoint)
    .patch(updateEndpoint)
    .delete(deleteEndpoint)
    .all((req, res, next) => {
        return next();
    });

module.exports = endpoints;