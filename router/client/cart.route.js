const router = require("express").Router();
const cartController = require("../../controllers/client/cart.controller.js");
router.post("/cart/add/:id", cartController.addToCart);
module.exports = router;
