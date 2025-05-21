const router = require('express').Router();
const checkoutController = require('../../controllers/client/checkout.controller');

router.get('/', checkoutController.index);
router.post('/order', checkoutController.order);
router.post('/order-success/:orderId', checkoutController.orderSuccess);
module.exports = router;
