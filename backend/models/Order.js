const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: Array,
    totalAmount: Number,
    paymentIntentId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
