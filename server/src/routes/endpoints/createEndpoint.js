const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const sanitise = require('../../helpers/sanitise');
const validate = require('../../helpers/validate');

const allowedMethods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];
const requiredFields = [
    'route',
    'method'
];

const createEndpoint = async (req, res) => {

    // Check for validity of Instance from JWT.
    if (!req.token || !req.token.id || !validate.mongoId(req.token.id)) {
        return res
            .status(401)
            .json({
                message: 'Unauthorized.'
            });
    }

    // Validate Method.
    if (!allowedMethods.includes(req.body.method)) {
        return res
            .status(400)
            .json({
                message: 'Invalid method supplied.'
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

    let existingRoute = await database.Instances.getByEndpointRoute(req.token.id, sanitise.route(req.body.route), req.body.method);

    if (existingRoute) {
        return res
            .status(400)
            .json({
                message: 'An endpoint already exists for the route and method supplied.'
            });
    }

    let instance = await database.Instances.addEndpoint(
        req.token.id,
        req.body.route,
        req.body.method,
        req.body.status ? req.body.status : null,
        req.body.headers ? req.body.headers : [],
        req.body.response ? req.body.response : '',
        req.body.delay ? req.body.delay : null
    );

    if (!instance) {
        return res
            .status(204)
            .json();
    }

    let endpoint = instance.endpoints.find((endpoint) => {
        return endpoint.route == req.body.route && endpoint.method == req.body.method;
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

module.exports = routeWrapper(requiredFields, createEndpoint);