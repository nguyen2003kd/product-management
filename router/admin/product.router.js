const router = require('express').Router();
const productController = require('../../controllers/admin/product.controller.js');
const productValidate=require('../../validate/admin/product-create.js')
//thư viện multer để tải ảnh
const multer  = require('multer')
const multerEditor= require('../../helpers/multer-editor.js')
const upload = multer({storage:multerEditor()})
router.get("/",productController.index);
router.patch("/change-status/:status/:id",productController.changeStatus);
router.patch("/mutil-change-status",productController.mutillChangeStatus);
router.patch("/change-deleted/:id",productController.deleted);
router.get("/create",productController.create)
router.post("/create",upload.single('thumbnail'),productValidate.createPost,productController.createPost)
module.exports = router;