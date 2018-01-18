const crypto = require('crypto');

const hmacSha256base64 = (data, secret) => {
    return crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('base64');
};

module.exports = {
    hmacSha256base64
};