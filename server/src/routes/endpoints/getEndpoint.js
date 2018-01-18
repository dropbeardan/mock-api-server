const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const validate = require('../../helpers/validate');

const requiredFields = [];

const getEndpoint = async (req, res) => {

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

    let instance = await database.Instances.getByEndpointId(req.token.id, req.params.endpointId);

    if (!instance) {
        return res
            .status(204)
            .json();
    }

    let endpoint = instance.endpoints.find((endpoint) => {
        return endpoint._id == req.params.endpointId;
    });

    return res
        .status(200)
        .json({
            id: endpoint._id,
            route: endpoint.route,
            method: endpoint.method,
            status: endpoint.status,
            headers: endpoint.headers,
            response: endpoint.response,
            delay: endpoint.delay,
            created: endpoint.created
        });
};

module.exports = routeWrapper(requiredFields, getEndpoint);