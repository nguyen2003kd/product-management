const router = require('express').Router();
const catelogyController = require('../../controllers/admin/catelogy.controller.js');
//thư viện multer để tải ảnh
const multer  = require('multer')
// const multerEditor= require('../../helpers/multer-editor.js')
const mulerCloud = require('../../middlewares/muler-cloud.js')
const upload = multer()

router.get("/",catelogyController.index);
router.get("/create",catelogyController.create);
router.post("/create",upload.single('thumbnail'),mulerCloud.mulerCloud,catelogyController.postCreate);
module.exports = router;