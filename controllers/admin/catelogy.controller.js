const systemAdmin = require('../../configs/system.js');
const productModel = require('../../models/product-catelogy.js');
module.exports.index = async (req, res) => {
    let find={
        deleted: false,
    }
    function creatTree(arr, parentId="") {
        let tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                let newItem=item
                let Children = creatTree(arr, item.id);
                if (Children.length >0) {
                    newItem.children = Children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }   
    let product=await productModel.find(find)
    const tree = creatTree(product);
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
    function creatTree(arr, parentId="") {
        let tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                let newItem=item
                let Children = creatTree(arr, item.id);
                if (Children.length >0) {
                    newItem.children = Children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }   
    let product=await productModel.find(find)
    const tree = creatTree(product);
    res.render("admin/pages/catelogy/catelogy-create", {
        pageTitle: "thêm mới loại sản phẩm",
        categories: tree,
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
    console.log(req.body)
    await productModel.create(req.body)
    res.redirect(systemAdmin.ADMINROUTER + "/catelogy");
}
//[GET] /admin/catelogy/edit/:id
module.exports.edit = async (req, res) => {
    let find={
        deleted: false,
    }
    function creatTree(arr, parentId="") {
        let tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                let newItem=item
                let Children = creatTree(arr, item.id);
                if (Children.length >0) {
                    newItem.children = Children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }   
    let product=await productModel.find(find)
    const tree = creatTree(product);
    let catelogy=await productModel.findById(req.params.id)
    res.render("admin/pages/catelogy/category-edit", {
        pageTitle: "sửa loại sản phẩm",
        categories: tree,
        catelogy:catelogy,
});
}
//[PATCH] /admin/catelogy/edit/:id
module.exports.postEdit = async (req, res) => {
    if(req.body.position==''){
        const count= await productModel.countDocuments()
        req.body.position=parseInt(count+1)
     }
     else
         req.body.position=parseInt(req.body.position)
    await productModel.updateOne({_id:req.params.id},req.body)
    res.redirect(systemAdmin.ADMINROUTER + "/catelogy");
}