const systemAdmin = require('../../configs/system.js');
const productModel = require('../../models/product-catelogy.js');
module.exports.index = async (req, res) => {
    let find={
        deleted: false,
    }
    let product=await productModel.find(find)
    res.render("admin/pages/catelogy/index", {
        pageTitle: "quang lý loai sản phẩm",
        ProductModel: product,
});
}
//[GET] /admin/catelogy/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/catelogy/catelogy-create", {
        pageTitle: "thêm mới loại sản phẩm",
});
}
//[POST] /admin/catelogy/create
module.exports.postCreate = async (req, res) => {
    if(req.body.position==''){
        const count= await productModel.countDocuments()
        req.body.position=parseInt(count+1)
     }
     else
         req.body.position=parseInt(req.body.position)
     await productModel.create(req.body)
    res.redirect(systemAdmin.ADMINROUTER + "/catelogy");
}