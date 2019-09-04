const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    "address": {
        type: String
    },
    userType: {
        type: String,
        enum: ['CUSTOMER', 'STOREMANAGER'],
        default: 'CUSTOMER'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DELETED'],
        default: 'ACTIVE'
    }
}, {
        timestamps: true
    });
userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;