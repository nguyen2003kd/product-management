const dashboardRouter = require('./dashboard.router.js');
const productRouter = require('./product.router.js');
const trashRouter = require('./trash.router.js');
const catelogyRouter = require('./catelogy.router.js');
const systemAdmin=require('../../configs/system.js');
module.exports=(app) => {
    app.use(systemAdmin.ADMINROUTER+'/dashboard', dashboardRouter);
    app.use(systemAdmin.ADMINROUTER+'/product', productRouter);
    app.use(systemAdmin.ADMINROUTER+'/trash', trashRouter);
    app.use(systemAdmin.ADMINROUTER+'/catelogy', catelogyRouter);
}