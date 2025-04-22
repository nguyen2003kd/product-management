const productRouter= require ("./product.router.js")
const homeRouter= require ("./home.router.js")
module.exports=(app)=>{
  app.use('/',homeRouter);
  app.use('/product', productRouter);
}