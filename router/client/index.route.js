const productRouter= require ("./product.route.js")
const homeRouter= require ("./home.route.js")
const searchRouter= require ("./search.route.js")
const cartRouter= require ("./cart.route.js")
const checkoutRouter= require ("./checkout.route.js")
const cartMiddleware= require ("../../middlewares/client/cart.middlewares.js")
const layoutCategories= require("../../middlewares/client/category.middlewares.js")
module.exports=(app)=>{
  app.use(layoutCategories.category);
  app.use(cartMiddleware.addToCart);
  app.use('/',homeRouter);
  app.use('/product', productRouter);
  app.use('/search', searchRouter);
  app.use('/cart', cartRouter);
  app.use('/checkout', checkoutRouter);
}
