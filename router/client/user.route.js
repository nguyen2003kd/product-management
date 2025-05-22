const router = require("express").Router();
const userController = require("../../controllers/client/user.controller");
const userValidate = require("../../validate/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const mulerCloud = require('../../middlewares/muler-cloud.js')
//thư viện multer để tải ảnh
const multer  = require('multer')
// const multerEditor= require('../../helpers/multer-editor.js')
const upload = multer()
router.get("/register", userController.register);
router.post("/register", userValidate.registerPost, userController.registerPost);
router.get("/login", userController.login);
router.post("/login", userValidate.loginPost, userController.loginPost);
router.get("/logout", userController.logout);
router.get("/forgot-password", userController.forgotPassword);
router.post("/forgot-password", userValidate.forgotPasswordPost, userController.forgotPasswordPost);
router.get("/otp-authentication", userController.otpAuthentication);
router.post("/otp-authentication", userValidate.otpAuthenticationPost, userController.otpAuthenticationPost);
router.post("/resend-otp", userController.resendOTP);
router.get("/reset-password", userController.resetPassword);
router.post("/reset-password", userValidate.resetPasswordPost, userController.resetPasswordPost);
router.get("/info", authMiddleware.requireAuth, userController.info);
router.get("/edit/:id", authMiddleware.requireAuth, userController.edit);
router.patch("/edit/:id", upload.single('avatar'),mulerCloud.mulerCloud,userController.editPost);
router.patch("/change-password/:id", userValidate.changePasswordPost, userController.changePasswordPost);
module.exports = router;
