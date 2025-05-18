const express= require('express');
const router=express.Router();
const productController=require('../../controllers/client/product.controller.js');
router.get('/',productController.index);
router.get('/:slug',productController.category)
router.get('/detail/:slug',productController.detail)
module.exports=router;