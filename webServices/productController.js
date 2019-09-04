const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/customerOrdersModel');
const responseHandler = require('../commonFunctions/responseHandler');
const httpResponseCode = require('../helper/httpResponseCode');
const httpResponseMessage = require('../helper/httpResponseMessage');

module.exports = {
    addProduct: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, userType: "STOREMANAGER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                } else if (!result) {
                    responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.USER_NOT_FOUND)
                } else {
                    const product = new productModel({
                        name: req.body.name,
                        decs: req.body.decs,
                        availableQuantity: req.body.availableQuantity,
                        unitPrice: req.body.unitPrice
                    })
                    product.save((error, saveProduct) => {
                        if (error) {
                            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                        } else {
                            responseHandler.sendResponseWithData(res, httpResponseCode.EVERYTHING_IS_OK, `Product ${httpResponseMessage.SAVED_SUCCESSFULLY}`, saveProduct);
                        }
                    })
                }
            })
        } catch (error) {
            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
        }
    },


    deleteProduct: (req, res) => {
        try {
            //userId
            //productId
            userModel.findOne({ _id: req.body.userId, userType: "STOREMANAGER", status: "ACTIVE" }, (error, getUser) => {
                if (error) {
                    responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                } else if (!getUser) {
                    responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.USER_NOT_FOUND)
                } else {
                    productModel.findByIdAndRemove({ _id: req.body.productId }, (error, deleteData) => {
                        if (error) {
                            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                        } else {
                            responseHandler.sendResponseWithData(res, httpResponseCode.RESOURCE_DELETED, `Product ${httpResponseMessage.DELETE}`, deleteData);
                        }
                    })
                }
            })
        } catch (error) {
            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
        }
    },

    modifyProduct: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, userType: "STOREMANAGER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                } else if (!result) {
                    responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.USER_NOT_FOUND)
                } else {
                    productModel.findByIdAndUpdate({ _id: req.body.productId }, req.body, { new: true }, (error, updateProduct) => {
                        if (error) {
                            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                        } else {
                            responseHandler.sendResponseWithData(res, httpResponseCode.EVERYTHING_IS_OK, `Product ${httpResponseMessage.UPDATE}`, updateProduct);
                        }
                    })
                }
            })
        } catch (error) {
            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
        }
    },

    getProductList: (req, res) => {
        var query, options;
        if (req.body.userType == "STOREMANAGER") {
            query = {
                status: 'ACTIVE'
            }
        }
        else if (req.body.userType == "CUSTOMER") {
            query = {
                availableQuantity: { $gt: 0 }, status: 'ACTIVE'
            }
        }
        options = {
            select: 'name unitPrice',
            sort: {
                createdAt: -1
            },
            page: req.query.page,
            limit: 5
        };
        if (req.body.search) {
            console.log("asdasd")
            let searchRegex = new RegExp(req.query.search.toLowerCase().trim(), 'i');
            query['name'] = searchRegex;
        }
        console.log("Query->", query)
        productModel.paginate(query, options, (err, result) => {
            if (err) {
                responseHandler.sendResponseWithoutData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR);
            }
            else if (result.docs.length == 0) {
                responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.NOT_FOUND)
            }
            else {
                responseHandler.sendResponseWithData(res, httpResponseCode.EVERYTHING_IS_OK, httpResponseMessage.SUCCESSFULLY_DONE, result.docs);
            }
        });
    },

    buyProduct: (req, res) => {
        userModel.findOne({ _id: req.body.userId, userType: "CUSTOMER", status: "ACTIVE" }, (err, result) => {
            if (err) {
                responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
            } else if (!result) {
                responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.USER_NOT_FOUND)
            } else {
                productModel.findOne({ _id: req.body.productId, status: "ACTIVE" }, (error, getProductData) => {
                    if (error) {
                        responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                    }
                    else if (!getProductData) {
                        responseHandler.sendResponseWithoutData(res, httpResponseCode.NOT_EXIST, httpResponseMessage.NOT_FOUND)
                    }
                    else {
                        console.log("Data:", getProductData.availableQuantity)
                        if (req.body.quantity > getProductData.availableQuantity) {
                            responseHandler.sendResponseWithoutData(res, httpResponseCode.EVERYTHING_IS_OK, httpResponseMessage.LIMIT_EXCEED)
                        }
                        else {
                            productModel.findByIdAndUpdate({ _id: req.body.productId }, { $inc: { availableQuantity: -(req.body.quantity) } }, { new: true }, (error, updateProduct) => {
                                if (error) {
                                    responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                                } else if (updateProduct) {
                                    let quantity = req.body.quantity
                                    let totalPrice = quantity * getProductData.unitPrice
                                    console.log(totalPrice, quantity, getProductData)
                                    const order = new orderModel({
                                        customerId: req.body.userId,
                                        productId: req.body.ProductId,
                                        quantity: req.body.quantity,
                                        unitPrice: getProductData.unitPrice,
                                        totalPrice: totalPrice
                                    })
                                    order.save((error, saveProduct) => {
                                        if (error) {
                                            responseHandler.sendResponseWithData(res, httpResponseCode.INTERNAL_SERVER_ERROR, httpResponseMessage.INTERNAL_SERVER_ERROR, error);
                                        } else {
                                            responseHandler.sendResponseWithData(res, httpResponseCode.EVERYTHING_IS_OK, httpResponseMessage.ORDER_SUCCESS, saveProduct);
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    },
}