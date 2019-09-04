const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const productSchema = new Schema({

    // Name, Description, Available Quantity, Unit Price
    name: String,
    decs: String,
    availableQuantity: Number,
    unitPrice:Number,
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
}, {
        timestamps: true
    });
productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;