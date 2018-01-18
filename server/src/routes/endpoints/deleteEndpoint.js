const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const validate = require('../../helpers/validate');

const requiredFields = [];

const deleteEndpoint = async (req, res) => {

    // Check for validity of Instance from JWT.
    if (!req.token || !req.token.id || !validate.mongoId(req.token.id)) {
        return res
            .status(401)
            .json({
                message: 'Unauthorized.'
            });
    }

    // Check for validity of supplied ID field.
    if (!validate.mongoId(req.params.endpointId)) {
        return res
            .status(400)
            .json({
                message: 'Invalid ID supplied.'
            });
    }

    let instance = await database.Instances.removeEndpoint(req.token.id, req.params.endpointId);

    return res
        .status(200)
        .json();
};

module.exports = routeWrapper(requiredFields, deleteEndpoint);