
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    orderStatus: {
        type: String,
        default: "processing"
    },
    stripeSessionId: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
