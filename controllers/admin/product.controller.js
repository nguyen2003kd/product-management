const productModel = require("../../models/product.model");
const categoryModel = require('../../models/product-catelogy.js');
const accountModel = require('../../models/account.model');
const searchProduct = require("../../helpers/search-product.js");
const filterStatus = require("../../helpers/filterStatus.js");
const paginationProduct = require("../../helpers/pagination-product.js");
const creatTree = require('../../helpers/creatTree.js');
//[GET] /admin/product
module.exports.index = async(req, res) => {
    let find={
        deleted: false,
    }
    let objectPagination = {
        page: 1,
        limit: 5,
    };
    let Product = await productModel.countDocuments(find);
    //filter product by status
    if (req.query.status) {
        find.status = req.query.status;
        Product = await productModel.countDocuments(find);
    }
    const status=filterStatus(req.query);
    //end filter product by status

    //search product
    const search = searchProduct(req.query);
    if (req.query.search) {
        find.title = search.title;
        Product = await productModel.countDocuments(find);
    }
    //end search product
    //pagination product
    objectPagination= paginationProduct(objectPagination,Product,req.query);
    //end pagination product
    //sort
    let sort = {}
    if( req.query.keysort && req.query.sortvalue) {
        sort[req.query.keysort] = req.query.sortvalue;
    }
    else {
        sort.position ='desc';
    }
    //end sort
    product=await productModel.find(find).limit(objectPagination.limit).skip((objectPagination.page-1)*objectPagination.limit).sort(sort);
    for (const item of product) {
        const acc = await accountModel.findById(item.created_by.account_id);
        console.log(acc)
        if(acc){
            item.accountFullname = acc.fullname;
        }
        else{
            item.accountFullname = 'Không tìm thấy tài khoản';
        }
    }
    console.log(product)
      
    res.render("admin/pages/product/index.pug", {
        pageTitle: "quang lý sản phẩm",
        ProductModel: product,
        status: status,
        searchs: search.search,
        objectPagination: objectPagination,
    });
} 
//[PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async(req, res) => {
    const updated_by={
        account_id: res.locals.account._id,
        updatedAt: new Date(),
    }
    await productModel.updateOne({
        _id: req.params.id,
    }, {
            $set:{status:req.params.status,},
            $push:{updated_by:updated_by},
        })
        req.flash('info', 'Cập nhật trạng thái thành công');
        res.redirect(req.headers.referer || '/');
}
//[PATCH]/admin/product/mutill-change-status
module.exports.mutillChangeStatus = async(req, res) => {
    const updated_by={
        account_id: res.locals.account._id,
        updatedAt: new Date(),
    }
    const ids=req.body.ids.split(',');
    switch (req.body.type) {
        case 'active':
            await productModel.updateMany({
                _id: ids,
            }, {
                $set:{status:'active'},
                $push:{updated_by:updated_by},
            })
            req.flash('info', 'Cập nhật trạng thái thành công');
            break;
        case 'inactive':
            await productModel.updateMany({
                _id: ids,
            }, {
                $set:{status:'inactive'},
                $push:{updated_by:updated_by},
            })
            req.flash('info', 'Cập nhật trạng thái thành công');
            break;
        case 'deleted':
            await productModel.updateMany({_id:ids},{deleted:true,deleted_by:{account_id:res.locals.account._id,deletedAt:Date.now()}})
            req.flash('info', 'xóa sản phẩm thành công');
            break;
        case 'position':
            for(const item of ids){
                let[id,position]=item.split('-');
                await productModel.updateOne({_id:id},{position:parseInt(position),$push:{updated_by:updated_by}})
            }
            req.flash('info', 'thay đổi vị trí thành công');
            break;
    }
    res.redirect(req.headers.referer);
}
//[PATCH]/admin/product/change-deleted/:id
module.exports.deleted = async(req, res) => {
    await productModel.updateOne({_id: req.params.id,},{$set:{deleted:true,deleted_by:{account_id:res.locals.account._id,deletedAt:Date.now()},}})
    req.flash('info', 'xóa sản phẩm thành công');
    res.redirect(req.headers.referer || '/');
}
//[GET]/admin/product/create
module.exports.create=async(req,res)=>{
    let find={
        deleted: false,
    } 
    let product=await categoryModel.find(find)
    const tree = creatTree.creatTree(product);
    res.render("admin/pages/product/create.pug",{
        pageTitle:"trang tạo mới sản phẩm",
        category: tree,
    })
}//[POST]/admin/product/create/:id
module.exports.createPost=async(req,res)=>{
    console.log(res.locals.account)
    req.body.created_by={
        account_id: res.locals.account._id,
    }
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    // if(req.file){
    //         req.body.thumbnail=`/uploads/${req.file.filename}`
    // }
    if(req.body.position==''){
       const count= await productModel.countDocuments()
       req.body.position=parseInt(count+1)
    }
    else
        req.body.position=parseInt(req.body.position)
    await productModel.create(req.body)
    
    res.redirect(req.headers.referer)
}
//[GET]/admin/product/edit
module.exports.edit=async(req,res)=>{
    let find={
        deleted: false,
    } 
    let product=await categoryModel.find(find)
    const editProduct=await productModel.findById(req.params.id)
    const tree = creatTree.creatTree(product);
    res.render("admin/pages/product/edit.pug",{
        product:editProduct,
        pageTitle:"trang chỉnh sửa sản phẩm",
        category: tree,
    })
}//[PATCH]/admin/product/edit/:id
module.exports.editPost=async(req,res)=>{
    const updated_by={
        account_id: res.locals.account._id,
        updatedAt: new Date(),
    }
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    // if(req.file){
    //         req.body.thumbnail=`/uploads/${req.file.filename}`
    // }
    if(req.body.position==''){
       const count= await productModel.countDocuments()
       req.body.position=parseInt(count+1)
    }
    else
        req.body.position=parseInt(req.body.position)
    await productModel.updateOne({_id:req.params.id},{$set:req.body,$push:{updated_by:updated_by}})
    req.flash('info', 'chỉnh sửa thành công');
    res.redirect('/admin/product')
}
//[get]/admin/product/detail/:id
module.exports.detail=async(req,res)=>{
    const item=await productModel.findById(req.params.id)
    res.render("admin/pages/product/detail.pug",{
        item:item,
        pageTitle:"Chi tiết sản phẩm"
    })
}