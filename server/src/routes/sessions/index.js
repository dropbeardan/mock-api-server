const sessions = require('express').Router();

const createSession = require('./createSession');

sessions.route('/')
    .post(createSession)
    .all((req, res, next) => { return next(); });

module.exports = sessions;