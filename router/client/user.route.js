const router = require("express").Router();
const userController = require("../../controllers/client/user.controller");
const userValidate = require("../../validate/client/user.validate");
router.get("/register", userController.register);
router.post("/register", userValidate.registerPost, userController.registerPost);
router.get("/login", userController.login);
router.post("/login", userValidate.loginPost, userController.loginPost);
router.get("/logout", userController.logout);
module.exports = router;
