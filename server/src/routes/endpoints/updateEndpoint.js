const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const validate = require('../../helpers/validate');

const requiredFields = [];

const updateEndpoint = async (req, res) => {

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

    // Validate Status Code.
    if (req.body.status && (req.body.status < 100 || req.body.status > 599)) {
        return res
            .status(400)
            .json({
                message: 'Invalid status code supplied.'
            });
    }

    // Validate Headers.
    if (req.body.headers && !Array.isArray(req.body.headers)) {
        return res
            .status(400)
            .json({
                message: 'Invalid headers supplied.'
            });
    }

    // Validate Delay.
    if (req.body.delay && (typeof (req.body.delay) != 'number' || req.body.delay < 0)) {
        return res
            .status(400)
            .json({
                message: 'Invalid delay supplied.'
            });
    }

    let instance = await database.Instances.updateEndpoint(
        req.token.id,
        req.params.endpointId,
        req.body.status,
        req.body.headers,
        req.body.response,
        req.body.delay
    );

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

module.exports = routeWrapper(requiredFields, updateEndpoint);