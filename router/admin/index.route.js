const dashboardRouter = require('./dashboard.route.js');
const productRouter = require('./product.route.js');
const trashRouter = require('./trash.route.js');
const catelogyRouter = require('./catelogy.route.js');
const rolesRouter = require('./roles.route.js');
const accountRouter = require('./accouts.route.js');
const authRouter = require('./auth.route.js');
const systemAdmin=require('../../configs/system.js');
const authMiddleware = require('../../middlewares/admin/auth.middleware.js')
module.exports=(app) => {
    app.use(systemAdmin.ADMINROUTER+'/dashboard',authMiddleware.requireAuth,dashboardRouter);
    app.use(systemAdmin.ADMINROUTER+'/product',authMiddleware.requireAuth, productRouter);
    app.use(systemAdmin.ADMINROUTER+'/trash',authMiddleware.requireAuth,trashRouter);
    app.use(systemAdmin.ADMINROUTER+'/catelogy',authMiddleware.requireAuth,catelogyRouter);
    app.use(systemAdmin.ADMINROUTER+'/roles', authMiddleware.requireAuth,rolesRouter);
    app.use(systemAdmin.ADMINROUTER+'/accounts',authMiddleware.requireAuth,accountRouter);
    app.use(systemAdmin.ADMINROUTER+'/auth', authRouter);
}