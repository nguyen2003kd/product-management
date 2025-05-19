const router = require("express").Router();
const cartController = require("../../controllers/client/cart.controller.js");
router.post("/add/:id", cartController.addToCart);
module.exports = router;
