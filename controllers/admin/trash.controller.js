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
    res.redirect(req.headers.referer || '/');
}
module.exports.restore = async (req, res) => {
    await productModel.updateOne({_id:req.params.id},{$set:{deleted:false}})
    res.redirect(req.headers.referer || '/');
}