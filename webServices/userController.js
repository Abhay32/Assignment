const userModel = require('../models/userModel');
const responseHandler = require('../commonFunctions/responseHandler');
const httpResponseCode = require('../helper/httpResponseCode');
const httpResponseMessage = require('../helper/httpResponseMessage');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
module.exports = {
    //------------------------------------------login------------------------------------

    addUser: (req, res) => {
        var hashPassword = bcrypt.hashSync(req.body.password);
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            userType: req.body.userType
        })
        user.save((error, saveProduct) => {
            if (error) {
                responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
            } else {
                responseHandler.sendResponseWithData(res, httpResponseCode.EVERYTHING_IS_OK, `Product ${httpResponseMessage.SAVED_SUCCESSFULLY}`, saveProduct);
            }
        })
    },

    login: (req, res) => {
        try {
            if (!req.body.password || !req.body.email) {
                responseHandler.sendResponseWithoutData(res, httpResponseCode.BAD_REQUEST, "Parameter missing")
            }
            else {
                var query = { email: req.body.email, status: "ACTIVE" };
                userModel.findOne(query, (err, userData) => {
                    if (err) {
                        responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                    }
                    else if (!userData) {
                        responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.USER_NOT_FOUND)
                    }
                    else {
                        var check = bcrypt.compareSync(req.body.password, userData.password);
                        if (check) {
                            var generatewToken = jwt.sign({ _id: userData._id }, "Assignment");
                            console.log("Success in login", userData, "generatewToken : ", generatewToken);
                            var loginData = { _id: userData._id, token: generatewToken };
                            responseHandler.sendResponseWithData(res, httpResponseCode.EVERYTHING_IS_OK, httpResponseMessage.LOGIN_SUCCESS, loginData);
                        }
                        else {
                            responseHandler.sendResponseWithoutData(res, httpResponseCode.UNAUTHORIZED, httpResponseMessage.INVALID_CREDENTIALS)
                        }
                    }
                })
            }
        } catch (error) {
            responseHandler.sendResponseWithoutData(res, httpResponseCode.SOMETHING_WENT_WRONG, httpResponseMessage.WENT_WRONG)
        }
    },
}