<<<<<<< HEAD
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    products: [
        {
            productData: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],

    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }

});


=======
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    products: [
        {
            productData: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],

    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }

});


>>>>>>> 58dbb0b7dbfef9105531a0ceb479ce8b8c01ca4e
module.exports = mongoose.model('Order', orderSchema);