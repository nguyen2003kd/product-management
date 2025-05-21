const productRouter= require ("./product.route.js")
const homeRouter= require ("./home.route.js")
const searchRouter= require ("./search.route.js")
const cartRouter= require ("./cart.route.js")
const checkoutRouter= require ("./checkout.route.js")
const userRouter= require ("./user.route.js")
const cartMiddleware= require ("../../middlewares/client/cart.middlewares.js")
const layoutCategories= require("../../middlewares/client/category.middlewares.js")
const userMiddleware= require ("../../middlewares/client/user.middleware.js")
module.exports=(app)=>{
  app.use(layoutCategories.category);
  app.use(cartMiddleware.addToCart);
  app.use(userMiddleware.requireUser);
  app.use('/',homeRouter);
  app.use('/product', productRouter);
  app.use('/search', searchRouter);
  app.use('/cart', cartRouter);
  app.use('/checkout', checkoutRouter);
  app.use('/user', userRouter);
}
