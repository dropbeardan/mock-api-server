const moment = require('moment');

const jwt = require('../../helpers/jwt');

const validateToken = async (req, res, next) => {

    // No token is supplied.
    if (!req.headers.authorization) {
        return res
            .status(401)
            .json({
                message: 'Unauthorized1.'
            });
    }

    try {
        let token = await jwt.verify(req.headers.authorization, req.ip);

        req.token = token;
        return next();

    } catch (err) {

        if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
            return res
                .status(401)
                .json({
                    message: 'Unauthorized2.'
                });
        }

        console.log(`${moment().format('LLLL')} [Validate Token] Unexpected Error: ${err}`);

        return res
            .status(500)
            .json({
                message: 'Unexpected Server Error.'
            });
    }
};

module.exports = validateToken;