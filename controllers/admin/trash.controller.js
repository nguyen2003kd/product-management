const productModel = require("../../models/product.model");
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
    const coutProduct=await productModel.countDocuments(find)
    const totalPage=Math.ceil(coutProduct/objectPagination.limit)
    objectPagination.totalPage=totalPage
    if(req.query.page){
        objectPagination.page=parseInt(req.query.page)
        skip=(objectPagination.page-1)*objectPagination.limit
    }
    let porduct=await productModel.find(find).limit(objectPagination.limit).skip(skip)
    res.render("admin/pages/trash/index.pug", {
        pageTitle: "thùng rác",
        product:porduct,
        objectPagination:objectPagination
    });
}
module.exports.deleted = async (req, res) => { 
    const id = req.params.id;
    await productModel.deleteOne({_id:id});
    req.flash('info', 'xóa sản phẩm thành công');
    res.redirect(req.headers.referer || '/');
}
module.exports.restore = async (req, res) => {
    await productModel.updateOne({_id:req.params.id},{$set:{deleted:false}})
    req.flash('info', 'khôi phục sản phẩm thành công');
    res.redirect(req.headers.referer || '/');
}
module.exports.multiChangeTrash= async(req,res)=>{
    const ids=req.body.ids.split(',');
    switch(req.body.type){
        case'deleted':
        await productModel.deleteMany({_id:ids})
        req.flash('info', 'xóa sản phẩm thành công');
        break
        case'restore':
        await productModel.updateMany({_id:ids},{deleted:false})
        req.flash('info', 'khôi phục sản phẩm thành công');
        break

    }
    res.redirect(req.headers.referer || '/');
}