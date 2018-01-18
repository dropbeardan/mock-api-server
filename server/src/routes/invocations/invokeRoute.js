const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

const database = require('../../database');

const routeWrapper = require('../../helpers/routeWrapper');
const sanitise = require('../../helpers/sanitise');

const allowedMethods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];
const requiredFields = [];

const invokeRoute = async (req, res, next) => {

    if (!allowedMethods.includes(req.method)) {
        return res
            .status(405)
            .json({
                message: 'Method Not Allowed.'
            });
    }

    let route = sanitise.route(req.path.substring(req.params.instance.length + 2));

    let instance = await database.Instances.invokeRoute(
        sanitise.alphaNumeric(req.params.instance),
        route,
        req.method
    );

    if (!instance) {
        return next();
    }

    let endpoint = instance.endpoints.find((endpoint) => {
        return endpoint.route == route && endpoint.method == req.method;
    });

    return await setTimeoutPromise(endpoint.delay ? endpoint.delay : 1)
        .then(() => {
            return res
                .set(endpoint.headers.reduce((currParams, header) => {
                    return { ...currParams, [header.key]: header.value };
                }, {}))
                .status(endpoint.status ? endpoint.status : 200)
                .send(endpoint.response ? String(endpoint.response) : '');
        });
};

module.exports = routeWrapper(requiredFields, invokeRoute);