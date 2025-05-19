const cartModel = require("../../models/cart.model.js");
module.exports.addToCart = async (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart =new cartModel();
        await cart.save();
        res.cookie("cartId", cart.id,{
            expires: new Date(Date.now() + 5 * 30 * 24 * 60 * 60 * 1000),
        });
    } else {
        // const cart = await cartModel.findById(req.cookies.cartId);
    }
    next();
}
