const jwt = require('jsonwebtoken');
const secret = require('../auth/jwtAuth');

const generate = async (instance, ipAddress) => {
    return await jwt.sign(
        {
            id: instance._id,
            ipAddress: ipAddress
        },
        secret,
        {
            issuer: 'DBPG_MOCK_API_SERVER',
            expiresIn: '30m'
        }
    );
};

const verify = async (token, ipAddress) => {
    return await jwt.verify(
        token,
        secret,
        {
            ipAddress: ipAddress,
            issuer: 'DBPG_MOCK_API_SERVER'
        }
    );
};

module.exports = {
    generate,
    verify
};