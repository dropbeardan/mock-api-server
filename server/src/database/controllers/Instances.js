const moment = require('moment');
const mongoose = require('mongoose');

const models = require('../models');

const encrypt = require('../../helpers/encrypt');
const objectUtilities = require('../../helpers/objectUtilities');
const randomize = require('../../helpers/randomize');

const addEndpoint = async (instanceId, route, method, status, headers, response, delay) => {
    let instance = await models.Instance
        .findOneAndUpdate({
            _id: mongoose.Types.ObjectId(instanceId)
        },
        {
            $push: {
                endpoints: {
                    route: route,
                    method: method,
                    status: status,
                    headers: headers,
                    response: response,
                    delay: delay
                }
            }
        },
        {
            new: true
        })
        .exec();

    return instance;
};

const create = async (name, password) => {
    let secret = randomize.string(50);
    let hashedPassword = encrypt.hmacSha256base64(password, secret);

    let instance = await new models.Instance({
        name: name,
        password: hashedPassword,
        secret: secret,
        endpoints: []
    }).save();

    return instance;
};

const getById = async (instanceId) => {
    let instance = await models.Instance
        .findOne({
            _id: mongoose.Types.ObjectId(instanceId)
        })
        .exec();

    return instance;
};

const getByLogin = async (name, password) => {
    let instance = await models.Instance
        .findOne({
            name: name
        })
        .exec();

    if (!instance || encrypt.hmacSha256base64(password, instance.secret) != instance.password) {
        return;
    }

    updateLastAccessed(instance._id);

    return instance;
};

const getByName = async (name) => {
    let instance = await models.Instance
        .findOne({
            name: name
        })
        .exec();

    return instance;
};

const getByEndpointId = async (instanceId, endpointId) => {
    let instance = await models.Instance
        .findOne({
            _id: mongoose.Types.ObjectId(instanceId),
            'endpoints._id': mongoose.Types.ObjectId(endpointId)
        })
        .exec();

    return instance;
};

const getByEndpointRoute = async (instanceId, route, method) => {
    let instance = await models.Instance
        .findOne({
            _id: mongoose.Types.ObjectId(instanceId),
            endpoints: {
                $elemMatch: {
                    route: route,
                    method: method
                }
            }
        })
        .exec();

    return instance;
};

const invokeRoute = async (name, route, method) => {
    let instance = await models.Instance
        .findOne({
            name: name,
            endpoints: {
                $elemMatch: {
                    route: route,
                    method: method
                }
            }
        })
        .exec();

    return instance;
};

const removeEndpoint = async (instanceId, endpointId) => {
    let instance = await models.Instance
        .findOneAndUpdate({
            _id: mongoose.Types.ObjectId(instanceId),
        },
        {
            $pull: {
                endpoints: {
                    _id: mongoose.Types.ObjectId(endpointId)
                }
            }
        },
        {
            new: true
        })
        .exec();

    return instance;
};

const updateEndpoint = async (instanceId, endpointId, status, headers, response, delay) => {
    let updateParams = objectUtilities.excFilterValues(
        {
            'endpoints.$.headers': headers ? headers : undefined,
            'endpoints.$.status': status ? status : undefined,
            'endpoints.$.response': response ? response : undefined,
            'endpoints.$.delay': delay ? delay : undefined
        },
        [undefined]
    );

    let instance = await models.Instance
        .findOneAndUpdate({
            _id: mongoose.Types.ObjectId(instanceId),
            'endpoints._id': mongoose.Types.ObjectId(endpointId)
        },
        {
            $set: updateParams
        },
        {
            new: true
        })
        .exec();

    return instance;
};

const updateLastAccessed = async (instanceId) => {
    let instance = await models.Instance
        .findOneAndUpdate({
            _id: mongoose.Types.ObjectId(instanceId)
        },
        {
            lastAccessed: moment()
        })
        .exec();

    return instance;
};

module.exports = {
    addEndpoint,
    create,
    getById,
    getByLogin,
    getByName,
    getByEndpointId,
    getByEndpointRoute,
    invokeRoute,
    removeEndpoint,
    updateEndpoint,
    updateLastAccessed
};