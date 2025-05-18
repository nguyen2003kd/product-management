const productModel = require("../../models/product.model");
const ProductCategory = require("../../models/product-catelogy.js");
const newPrice = require("../../helpers/newPrices");
module.exports.index = async (req, res) => {
    let products = await productModel.find({ title: { $regex: req.query.keyword, $options: "i" },deleted:false,status:"active" });
    for(const item of products){
        if(item.product_category_id){
            const category = await ProductCategory.findOne({_id:item.product_category_id})
            item.category = category
        }
    }
    products=newPrice.newPrices(products)
    res.render('client/pages/search/index',{
        pageTitle:"Kết quả tìm kiếm",
        products:products,
        keyword:req.query.keyword
    }
    );
}