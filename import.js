module.exports = {
    express: require('express'),
    bodyParser: require('body-parser'),
    router: require('express').Router(),
    cors: require('cors'),
    mongoose: require('mongoose'),
    Schema: require('mongoose').Schema,
    mongoosePaginate: require('mongoose-paginate'),
    mongoDbConnect: require('./dbHandler/mongodb'),
    bcrypt: require('bcryptjs'),
    config: require('./config/config')(),
    jwt: require('jsonwebtoken'),

    userRoute: require('./routes/userRoutes'),
    productRoute: require('./routes/productRoutes'),

    responseHandler: require('./commonFunctions/responseHandler'),
    httpResponseCode: require('./helper/httpResponseCode'),
    httpResponseMessage: require('./helper/httpResponseMessage')
};