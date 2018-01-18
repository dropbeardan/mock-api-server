const config = {
    dev: {
        host: 'localhost',
        port: 27017,
        database: 'MOCK_API_DEV',
        poolSize: 10
    },
    test: {
        host: 'localhost',
        port: 27017,
        database: 'MOCK_API_TEST',
        poolSize: 10
    },
    production: {
        host: 'localhost',
        port: 27017,
        database: 'MOCK_API',
        poolSize: 10
    }
};

module.exports = config[process.env.NODE_ENV];