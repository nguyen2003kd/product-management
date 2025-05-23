const router = require('express').Router();
const accountController = require('../../controllers/admin/accounts.controller.js');
const mulerCloud = require('../../middlewares/muler-cloud.js')
const accountValidate = require('../../validate/admin/account.validate.js')
//thư viện multer để tải ảnh
const multer  = require('multer')
// const multerEditor= require('../../helpers/multer-editor.js')
const upload = multer()
router.get("/",accountController.index);
router.get("/create",accountController.create);
router.post("/create",accountValidate.creatPost,upload.single('avatar'),mulerCloud.mulerCloud,accountController.postCreate);
router.get("/edit/:id",accountController.edit);
router.patch("/edit/:id",upload.single('avatar'),mulerCloud.mulerCloud,accountValidate.editPatch,accountController.patchEdit);
module.exports = router;