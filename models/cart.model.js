const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: String,
    products: [
        {
        productId: String,
        quantity: Number
        }
    ]
}, {
  timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;