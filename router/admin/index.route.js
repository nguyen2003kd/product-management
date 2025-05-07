const dashboardRouter = require('./dashboard.route.js');
const productRouter = require('./product.route.js');
const trashRouter = require('./trash.route.js');
const catelogyRouter = require('./catelogy.route.js');
const rolesRouter = require('./roles.route.js');
const accountRouter = require('./accouts.route.js');
const systemAdmin=require('../../configs/system.js');
module.exports=(app) => {
    app.use(systemAdmin.ADMINROUTER+'/dashboard', dashboardRouter);
    app.use(systemAdmin.ADMINROUTER+'/product', productRouter);
    app.use(systemAdmin.ADMINROUTER+'/trash', trashRouter);
    app.use(systemAdmin.ADMINROUTER+'/catelogy', catelogyRouter);
    app.use(systemAdmin.ADMINROUTER+'/roles', rolesRouter);
    app.use(systemAdmin.ADMINROUTER+'/accounts', accountRouter);
}