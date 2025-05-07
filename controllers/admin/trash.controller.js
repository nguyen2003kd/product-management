const productModel = require("../../models/product.model");
const rolesModel = require("../../models/roles.model");
const accountModel = require("../../models/account.model");
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
    let skip=(objectPagination.page-1)*objectPagination.limit
    let coutProduct=0
    let totalPage=0
    let porduct={}
    switch(req.query.selected){
        case 'product':
            coutProduct=await productModel.countDocuments(find)
            totalPage=Math.ceil(coutProduct/objectPagination.limit)
            objectPagination.totalPage=totalPage
            if(req.query.page){
                objectPagination.page=parseInt(req.query.page)
                skip=(objectPagination.page-1)*objectPagination.limit
            }
            porduct=await productModel.find(find).limit(objectPagination.limit).skip(skip)
            break
        case 'permission':
            coutProduct=await rolesModel.countDocuments(find)
            totalPage=Math.ceil(coutProduct/objectPagination.limit)
            objectPagination.totalPage=totalPage
            if(req.query.page){
                objectPagination.page=parseInt(req.query.page)
                skip=(objectPagination.page-1)*objectPagination.limit
            }
            porduct=await rolesModel.find(find).limit(objectPagination.limit).skip(skip)
            break
        case 'account':
            coutProduct=await accountModel.countDocuments(find)
            totalPage=Math.ceil(coutProduct/objectPagination.limit)
            objectPagination.totalPage=totalPage
            if(req.query.page){
                objectPagination.page=parseInt(req.query.page)
                skip=(objectPagination.page-1)*objectPagination.limit
            }
            porduct=await accountModel.find(find).limit(objectPagination.limit).skip(skip)
            break
        default:
            coutProduct=await productModel.countDocuments(find)
            totalPage=Math.ceil(coutProduct/objectPagination.limit)
            objectPagination.totalPage=totalPage
            if(req.query.page){
                objectPagination.page=parseInt(req.query.page)
                skip=(objectPagination.page-1)*objectPagination.limit
            }
            porduct=await productModel.find(find).limit(objectPagination.limit).skip(skip)
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
    console.log(req.query);
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
    console.log(req.query);
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