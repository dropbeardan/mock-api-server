const database = require('../../database');

const jwt = require('../../helpers/jwt');
const routeWrapper = require('../../helpers/routeWrapper');
const sanitise = require('../../helpers/sanitise');
const validate = require('../../helpers/validate');

const requiredFields = [
    'instance',
    'password'
];

const createInstance = async (req, res) => {

    let sanitisedInstance = sanitise.alphaNumeric(req.body.instance);

    if (!validate.instance(sanitisedInstance)) {
        return res
            .status(400)
            .json({
                message: 'Instance name is invalid.'
            });
    }

    let existingInstance = await database.Instances.getByName(sanitisedInstance);

    if (existingInstance) {
        return res
            .status(400)
            .json({
                message: 'Instance name is not available.'
            });
    }

    let instance = await database.Instances.create(sanitisedInstance, req.body.password);

    let sessionToken = await jwt.generate(instance, req.ip);

    return res
        .status(200)
        .json({
            token: sessionToken
        });
};

module.exports = routeWrapper(requiredFields, createInstance);