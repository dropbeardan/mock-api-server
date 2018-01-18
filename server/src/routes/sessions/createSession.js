const database = require('../../database');

const jwt = require('../../helpers/jwt');
const routeWrapper = require('../../helpers/routeWrapper');
const sanitise = require('../../helpers/sanitise');

const requiredFields = [
    'instance',
    'password'
];

const createSession = async (req, res) => {

    let instance = await database.Instances.getByLogin(sanitise.alphaNumeric(req.body.instance), req.body.password);

    if (!instance) {
        return res
            .status(403)
            .json({
                message: 'Invalid credentials provided.'
            });
    }

    // Instance identification will be based on the ip-bound Session Token.
    let sessionToken = await jwt.generate(instance, req.ip);

    return res
        .status(200)
        .json({
            token: sessionToken
        });
};

module.exports = routeWrapper(requiredFields, createSession);