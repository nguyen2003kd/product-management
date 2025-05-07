const router = require('express').Router();
const accountController = require('../../controllers/admin/accounts.controller.js');
const mulerCloud = require('../../middlewares/muler-cloud.js')
//thư viện multer để tải ảnh
const multer  = require('multer')
// const multerEditor= require('../../helpers/multer-editor.js')
const upload = multer()
router.get("/",accountController.index);
router.get("/create",accountController.create);
router.post("/create",upload.single('avatar'),mulerCloud.mulerCloud,accountController.postCreate);
module.exports = router;