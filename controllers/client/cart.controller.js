const cartModel = require("../../models/cart.model");
module.exports.addToCart = async (req, res, next) =>{
    const quantity = parseInt(req.body.quantity);
    const productId = req.params.id;
    const cartId = req.cookies.cartId;
    const objCart = {
        productId:productId,
        quantity:quantity
    }
    const cart = await cartModel.findOne({_id:cartId});
    const product = cart.products.find(product => product.productId === productId);
    if(product){
        const newQuantity = product.quantity + quantity;
        if(newQuantity > product.stock){
            req.flash("error","Số lượng sản phẩm không được vượt quá số lượng trong kho");
            return res.redirect(req.headers.referer || '/');
        }
        await cartModel.updateOne({_id:cartId,products:{$elemMatch:{productId:productId}}},{$set:{'products.$.quantity':newQuantity}});
    }else{
        await cartModel.updateOne({_id:cartId},{$push:{products:objCart}});
    }

    req.flash("info","Thêm vào giỏ hàng thành công");
    res.redirect(req.headers.referer || '/');
}