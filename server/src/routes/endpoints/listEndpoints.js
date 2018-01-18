const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const validate = require('../../helpers/validate');

const requiredFields = [];

const listEndpoints = async (req, res) => {

    // Check for validity of Instance from JWT.
    if (!req.token || !req.token.id || !validate.mongoId(req.token.id)) {
        return res
            .status(401)
            .json({
                message: 'Unauthorized3.'
            });
    }

    let instance = await database.Instances.getById(req.token.id);

    if (!instance) {
        return res
            .status(401)
            .json({
                message: 'Unauthorized4.'
            });
    }

    let response = instance.endpoints.map((endpoint) => {
        return {
            id: endpoint._id,
            route: endpoint.route,
            method: endpoint.method,
            status: endpoint.status,
            headers: endpoint.headers,
            response: endpoint.response,
            delay: endpoint.delay,
            created: endpoint.created
        };
    });

    return res
        .status(200)
        .json(response);
};

module.exports = routeWrapper(requiredFields, listEndpoints);