const auth = require('basic-auth');
var jwt = require('jsonwebtoken');
const config = require('../config/config')();
const responseHandler = require('../commonFunctions/responseHandler');
const httpResponseCode = require('../helper/httpResponseCode');
const httpResponseMessage = require('../helper/httpResponseMessage');

exports.basicAuthUser = function (req, res, next) {
    try {
        var credentials = auth(req);
        if (!credentials || credentials.name !== config.basicAuthUser || credentials.pass !== config.basicAuthKey) {
            res.statusCode = httpResponseCode.UNAUTHORIZED
            res.setHeader('WWW-Authenticate', 'Basic realm="example"')
            responseHandler.sendResponseWithoutData(res, httpResponseCode.UNAUTHORIZED, httpResponseMessage.INVALID_AUTH)
        } else {
            next();
        }

    } catch (error) {
        responseHandler.sendResponseWithData(res, httpResponseCode.WENT_WRONG, httpResponseMessage.WENT_WRONG, error)
    }
}
exports.verifyToken = (req, res, next) => {
    if (req.headers.token) {
        jwt.verify(req.headers.token, 'Assignment', (error, result) => {
            if (error) {
                responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
            }
            else if (!result) {
                responseHandler.sendResponseWithoutData(res, httpResponseCode.UNAUTHORIZED, httpResponseMessage.INVALID_TOKEN);
            }
            else {
                next();
            }
        })
    } else {
        responseHandler.sendResponseWithData(res, httpResponseCode.NOT_FOUND,"No token provided");
    }
}