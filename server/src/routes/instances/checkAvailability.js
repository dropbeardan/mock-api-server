const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const sanitise = require('../../helpers/sanitise');
const validate = require('../../helpers/validate');

const requiredFields = [];

const checkAvailability = async (req, res) => {

    let sanitisedInstance = sanitise.alphaNumeric(req.params.instance);

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
            .status(200)
            .json({
                available: false
            });
    }

    return res
        .status(200)
        .json({
            available: true
        });
};

module.exports = routeWrapper(requiredFields, checkAvailability);