const productModel = require("../../models/product.model");
const searchProduct = require("../../helpers/search-product.js");
const filterStatus = require("../../helpers/filterStatus.js");
const paginationProduct = require("../../helpers/pagination-product.js");
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
    let product=await productModel.find(find).limit(objectPagination.limit).skip((objectPagination.page-1)*objectPagination.limit).sort({position:'desc'});
    //end pagination product
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
        await productModel.updateOne({
            _id: req.params.id,
        }, {
            $set:{status:req.params.status},
        })
        req.flash('info', 'Cập nhật trạng thái thành công');
        res.redirect(req.headers.referer || '/');
}
//[PATCH]/admin/product/mutill-change-status
module.exports.mutillChangeStatus = async(req, res) => {
    const ids=req.body.ids.split(',');
    const now = new Date();
    const utc = now.getTime();
    switch (req.body.type) {
        case 'active':
            await productModel.updateMany({
                _id: ids,
            }, {
                $set:{status:'active'},
            })
            req.flash('info', 'Cập nhật trạng thái thành công');
            break;
        case 'inactive':
            await productModel.updateMany({
                _id: ids,
            }, {
                $set:{status:'inactive'},
            })
            req.flash('info', 'Cập nhật trạng thái thành công');
            break;
        case 'deleted':
            await productModel.updateMany({_id:ids},{deleted:true,deletedAt:new Date(utc + 7 * 60 * 60 * 1000)})
            req.flash('info', 'xóa sản phẩm thành công');
            break;
        case 'position':
            for(const item of ids){
                let[id,position]=item.split('-');
                await productModel.updateOne({_id:id},{position:parseInt(position)})
            }
            req.flash('info', 'thay đổi vị trí thành công');
            break;
    }
    res.redirect(req.headers.referer);
}
//[PATCH]/admin/product/change-deleted/:id
module.exports.deleted = async(req, res) => {
    const now = new Date();
    const utc = now.getTime();
    await productModel.updateOne({_id: req.params.id,},{$set:{deleted:true,deletedAt:new Date(utc + 7 * 60 * 60 * 1000)},})
    req.flash('info', 'xóa sản phẩm thành công');
    res.redirect(req.headers.referer || '/');
}
module.exports.create=async(req,res)=>{
    res.render("admin/pages/product/create.pug")
}
module.exports.createPost=async(req,res)=>{
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    if(req.file){
            req.body.thumbnail=`/uploads/${req.file.filename}`
    }
    if(req.body.position==''){
       const count= await productModel.countDocuments()
       req.body.position=parseInt(count+1)
    }
    else
        req.body.position=parseInt(req.body.position)
    await productModel.create(req.body)
    res.redirect(req.headers.referer)
}
