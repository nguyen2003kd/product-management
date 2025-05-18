const productRouter= require ("./product.route.js")
const homeRouter= require ("./home.route.js")
const layoutCategories= require("../../middlewares/client/category.middlewares.js")
module.exports=(app)=>{
  app.use(layoutCategories.category);
  app.use('/',homeRouter);
  app.use('/product', productRouter);
}