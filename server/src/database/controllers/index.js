const fs = require('fs');
const path = require('path');

const controllers = {};
const thisFile = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== thisFile && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        let controller = require(path.join(__dirname, file));
        controllers[file.slice(0, file.length - 3)] = controller;
    });

module.exports = controllers;