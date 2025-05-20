const router = require("express").Router();
const cartController = require("../../controllers/client/cart.controller.js");
router.get("/", cartController.index);
router.post("/add/:id", cartController.addToCart);
router.get("/delete/:id", cartController.deleteCart);
router.get("/:id/:quantity", cartController.updateCart);
module.exports = router;
