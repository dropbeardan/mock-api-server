const fs = require('fs');
const path = require('path');

const models = {};
const thisFile = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== thisFile && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        let model = require(path.join(__dirname, file));
        models[file.slice(0, file.length - 3)] = model;
    });

module.exports = models;