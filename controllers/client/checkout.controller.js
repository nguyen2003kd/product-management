const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const newPrices = require("../../helpers/newPrices");
const orderModel = require("../../models/order.model");
//[GET] /checkout
module.exports.index = async (req, res) => {
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
    res.render('client/pages/checkout/index.pug',{
        pageTitle:"Thanh toán",
        cartDetail:cart,
        totalPrice:totalPrice.toFixed(2)
    })
}
//[POST] /checkout/order
module.exports.order = async (req, res) => {
    const userInfo ={
        fullName:req.body.name,
        phone:req.body.phone,
        address:req.body.address
    }
    const deliveryMethod = req.body.deliveryMethod;
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findById(cartId);
    let products = [];
    if(cart.products.length > 0){
        for(let item of cart.products){
            const objProduct = {
                productId:item.productId,
                price:0,
                discountPercentage:0,
                quantity:item.quantity
            }
            const product = await productModel.findById(item.productId).select("price discountPercentage ");
            if(product){
                objProduct.price = parseInt(product.price);
                objProduct.discountPercentage = parseInt(product.discountPercentage);
            }
            products.push(objProduct);
        }
    }   
    const order = new orderModel({
        userInfo:userInfo,
        deliveryMethod:deliveryMethod,
        cartId:cartId,
        products:products,
    })
    await order.save();
    await cartModel.findByIdAndUpdate(cartId,{
        products:[]
    })
    res.render('client/pages/checkout/order-post.pug',{
        orderId:order._id
    })
}

//[GET] /checkout/order-success/:orderId
module.exports.orderSuccess = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await orderModel.findById(orderId);
    if(order){
        order.products.forEach(async (item) => {
            const product = await productModel.findById(item.productId);
            if(product){
                product.stock -= item.quantity;
                await product.save();
            }
        })
    }
    const totalPrice = order.products.reduce((sum,item)=>{
        return sum + (item.price * (100 - item.discountPercentage) / 100) * item.quantity;
    },0)
    res.render('client/pages/checkout/order-success.pug',{
        pageTitle:"Thanh toán thành công",
        order:order,
        totalPrice:totalPrice.toFixed(2)
    })
}