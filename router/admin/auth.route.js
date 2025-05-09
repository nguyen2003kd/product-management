const router = require('express').Router();
const authController = require('../../controllers/admin/auth.controller.js');
router.get("/",authController.login);
router.post("/",authController.postLogin);
router.get("/logout",authController.logout);
module.exports = router;