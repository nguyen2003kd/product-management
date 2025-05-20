const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const newPrices = require("../../helpers/newPrices");
module.exports.index = async (req, res) =>{
    let totalPrice = 0;
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findOne({_id:cartId});
    if(cart.products.length > 0){
        for(const item of cart.products){
            const product = await productModel.findById(item.productId).select("title price thumbnail discountPercentage stock slug");
            if(product){
                const productNewPrice = newPrices.newPrice(product);
                item.productInfo = productNewPrice;
                totalPrice += productNewPrice.newPrice * item.quantity;
            }
        }   
    }
    res.render("client/pages/cart/index.pug",{
        pageTitle:"Giỏ hàng",
        cartDetail:cart,
        totalPrice:totalPrice.toFixed(2)
    });
}
module.exports.addToCart = async (req, res) =>{
    const quantity = parseInt(req.body.quantity);
    const productId = req.params.id;
    const cartId = req.cookies.cartId;
    const objCart = {
        productId:productId,
        quantity:quantity
    }
    const cart = await cartModel.findOne({_id:cartId});
    const productOrigin = await productModel.findById(productId);
    const product = cart.products.find(product => product.productId === productId);
    if(product){
        const newQuantity = product.quantity + quantity;
        if(newQuantity > productOrigin.stock){
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