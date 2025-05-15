const productModel = require("../../models/product.model");
const rolesModel = require("../../models/roles.model");
const accountModel = require("../../models/account.model");
const paginationProduct = require("../../helpers/pagination-product.js");
module.exports.index = async (req, res) => {
    let find={
        deleted:true
    }
    let objectPagination={
        page:1,
        limit:5
    }
    if(req.query.search){
        const regex = new RegExp(req.query.search, 'i')
        find.title=regex
    }
    let coutProduct=0
    let porduct={}
    switch(req.query.selected){
        case 'product':
            coutProduct=await productModel.countDocuments(find)
            objectPagination=paginationProduct(objectPagination,coutProduct,req.query)
            porduct=await productModel.find(find).limit(objectPagination.limit).skip((objectPagination.page-1)*objectPagination.limit)
            break
        case 'permission':
            coutProduct=await rolesModel.countDocuments(find)
            objectPagination=paginationProduct(objectPagination,coutProduct,req.query)
            porduct=await rolesModel.find(find).limit(objectPagination.limit).skip((objectPagination.page-1)*objectPagination.limit)
            break
        case 'account':
            coutProduct=await accountModel.countDocuments(find)
            objectPagination=paginationProduct(objectPagination,coutProduct,req.query)
            porduct=await accountModel.find(find).limit(objectPagination.limit).skip((objectPagination.page-1)*objectPagination.limit)
            break
        default:
            coutProduct=await productModel.countDocuments(find)
            objectPagination=paginationProduct(objectPagination,coutProduct,req.query)
            porduct=await productModel.find(find).limit(objectPagination.limit).skip((objectPagination.page-1)*objectPagination.limit)
            break
        }
    res.render("admin/pages/trash/index.pug", {
        pageTitle: "thùng rác",
        product:porduct,
        objectPagination:objectPagination,
        selected:req.query.selected || 'product',
    });
}
module.exports.deleted = async (req, res) => {
    const id = req.params.id;
    switch(req.query.selected){
        case 'product':
            await productModel.deleteOne({_id:id});
            req.flash('info', 'xóa sản phẩm thành công');
            break
        case 'permission':
            await rolesModel.deleteOne({_id:id});
            req.flash('info', 'xóa quyền thành công');
            break
        case 'account':
            await accountModel.deleteOne({_id:id});
            req.flash('info', 'xóa tài khoản thành công');
            break
        default:
            await productModel.deleteOne({_id:id});
            req.flash('info', 'xóa sản phẩm thành công');
            break
    }
    res.redirect(req.headers.referer || '/');
}
module.exports.restore = async (req, res) => {
    switch(req.query.selected){
        case 'product':
            await productModel.updateOne({_id:req.params.id},{$set:{deleted:false}});
            req.flash('info', 'khôi phục sản phẩm thành công');
            break
        case 'permission':
            await rolesModel.updateOne({_id:req.params.id},{$set:{deleted:false}});
            req.flash('info', 'khôi phục quyền thành công');
            break
        case 'account':
            await accountModel.updateOne({_id:req.params.id},{$set:{deleted:false}});
            req.flash('info', 'khôi phục tài khoản thành công');
            break
        default:
            await productModel.updateOne({_id:req.params.id},{$set:{deleted:false}});
            req.flash('info', 'khôi phục sản phẩm thành công');
            break
    }
    res.redirect(req.headers.referer || '/');
}
module.exports.multiChangeTrash= async(req,res)=>{
    const ids=req.body.ids.split(',');
    switch(req.body.type){
        case'deleted':
            if(req.query.selected=='product'){
                await productModel.deleteMany({_id:ids})
                req.flash('info', 'xóa sản phẩm thành công');
                break
            }
            else if(req.query.selected=='permission'){
                await rolesModel.deleteMany({_id:ids})
                req.flash('info', 'xóa quyền thành công');
                break
            }
            else if(req.query.selected=='account'){
                await accountModel.deleteMany({_id:ids})
                req.flash('info', 'xóa tài khoản thành công');
                break
            }
            else{
                await productModel.deleteMany({_id:ids})
                req.flash('info', 'xóa sản phẩm thành công');
                break
            }
        case'restore':
            if(req.query.selected=='product'){
                await productModel.updateMany({_id:ids},{$set:{deleted:false}})
                req.flash('info', 'khôi phục sản phẩm thành công');
                break}
            else if(req.query.selected=='permission'){
                await rolesModel.updateMany({_id:ids},{$set:{deleted:false}})
                req.flash('info', 'khôi phục quyền thành công');
                break}
            else if(req.query.selected=='account'){
                await accountModel.updateMany({_id:ids},{$set:{deleted:false}})
                req.flash('info', 'khôi phục tài khoản thành công');
                break}
            else{
                await productModel.updateMany({_id:ids},{$set:{deleted:false}})
                req.flash('info', 'khôi phục sản phẩm thành công');
                break}

    }
    res.redirect(req.headers.referer || '/');
}