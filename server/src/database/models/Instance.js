const mongoose = require('mongoose');

const EndpointSchema = new mongoose.Schema({
    route: { type: String, required: true },
    method: { type: String, enum: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] },
    status: { type: Number, min: 100, max: 599 },
    headers: { type: [mongoose.Schema.Types.Mixed] },
    response: { type: String },
    delay: { type: Number },
    created: { type: Date, default: Date.now }
});

const InstanceSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    secret: { type: String, required: true },
    endpoints: [EndpointSchema],
    lastAccessed: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
});

const InstanceModel = mongoose.model('Instance', InstanceSchema);

module.exports = InstanceModel;