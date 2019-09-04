const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const orderSchema = new Schema({

    // Name, Description, Available Quantity, Unit Price
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,

}, {
        timestamps: true
    });
orderSchema.plugin(mongoosePaginate);
const orderModel = mongoose.model('Orders', orderSchema);
module.exports = orderModel;