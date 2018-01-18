const fs = require('fs');
const path = require('path');

const server = require('./server');

// Client Statics.
const staticDir = {
    dev: path.join(__dirname, '..', 'mockClient'),
    test: path.join(__dirname, '..', 'client'),
    production: path.join(__dirname, '..', 'client')
};

const app = server(process.env.HTTP_PORT, null, null, staticDir[process.env.NODE_ENV]);