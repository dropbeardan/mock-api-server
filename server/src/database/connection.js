const moment = require('moment');
const mongoose = require('mongoose');

const config = require('./config');

const connection = mongoose.connection;
mongoose.Promise = global.Promise;

mongoose.connect(
    `mongodb://${config.host}:${config.port}/${config.database}`,
    {
        config: { autoIndex: false },
        poolSize: config.poolSize,
        useMongoClient: true
    }
);

connection.on('error', (err) => {
    console.log(`${moment().format('LLLL')} [MONGO] Error connecting to MongoDB: ${err}`);
});

connection.on('open', () => {
    console.log(`${moment().format('LLLL')} [MONGO] Connected to ${config.database}.`);
});

connection.on('disconnected', () => {
    console.log(`${moment().format('LLLL')} [MONGO] Disconnected from ${config.database}.`);
});

// Close all open Mongoose connections when the Node process ends.
process.on('SIGINT', function () {
    connection.close(() => {
        console.log(`${moment().format('LLLL')} [MONGO] Disconnected from ${config.database}. (Node Process Terminated)`);
        process.exit(0);
    });
});