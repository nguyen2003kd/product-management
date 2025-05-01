const systemAdmin = require('../../configs/system.js');
const categoryModel = require('../../models/product-catelogy.js');
const creatTree = require('../../helpers/creatTree.js');
module.exports.index = async (req, res) => {
    let find={
        deleted: false,
    } 
    let product=await categoryModel.find(find)
    const tree = creatTree.creatTree(product);
    res.render("admin/pages/catelogy/index", {
        pageTitle: "quang lý loai sản phẩm",
        category: tree,
});
}
//[GET] /admin/catelogy/create
module.exports.create = async (req, res) => {
    let find={
        deleted: false,
    }
    let product=await categoryModel.find(find)
    const tree = creatTree.creatTree(product);
    res.render("admin/pages/catelogy/catelogy-create", {
        pageTitle: "thêm mới loại sản phẩm",
        categories: tree,
});
}
//[POST] /admin/catelogy/create
module.exports.postCreate = async (req, res) => {
    if(req.body.position==''){
        const count= await categoryModel.countDocuments()
        req.body.position=parseInt(count+1)
     }
     else
         req.body.position=parseInt(req.body.position)
    console.log(req.body)
    await categoryModel.create(req.body)
    res.redirect(systemAdmin.ADMINROUTER + "/catelogy");
}
//[GET] /admin/catelogy/edit/:id
module.exports.edit = async (req, res) => {
    let find={
        deleted: false,
    }
    let product=await categoryModel.find(find)
    const tree = creatTree.creatTree(product);
    let catelogy=await categoryModel.findById(req.params.id)
    res.render("admin/pages/catelogy/category-edit", {
        pageTitle: "sửa loại sản phẩm",
        categories: tree,
        catelogy:catelogy,
});
}
//[PATCH] /admin/catelogy/edit/:id
module.exports.postEdit = async (req, res) => {
    if(req.body.position==''){
        const count= await categoryModel.countDocuments()
        req.body.position=parseInt(count+1)
     }
     else
         req.body.position=parseInt(req.body.position)
    await categoryModel.updateOne({_id:req.params.id},req.body)
    res.redirect(systemAdmin.ADMINROUTER + "/catelogy");
}