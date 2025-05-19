const productModel = require("../../models/product.model");
const ProductCategory = require("../../models/product-catelogy.js");
const newPrice = require("../../helpers/newPrices");
module.exports.index = async (req, res) => {
    const find = {
        title: { $regex: req.query.keyword, $options: "i" },
        deleted: false,
        status: "active"
    };
    if(req.query.min && req.query.max){
        const min = parseFloat(req.query.min) || 0;
        const max = parseFloat(req.query.max) || Infinity;
        find.price = {
            $gte: min,
            $lte: max
        }
    }
    let products = await productModel.find(find);
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

// Add new autocomplete endpoint
module.exports.autocomplete = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        if (!keyword) {
            return res.json([]);
        }

        const products = await productModel.find({
            title: { $regex: keyword, $options: "i" },
            deleted: false,
            status: "active"
        })
        .select('title slug thumbnail price discountPercentage')
        .limit(5);

        const suggestions = products.map(product => ({
            title: product.title,
            slug: product.slug,
            thumbnail: product.thumbnail,
            price: product.price,
            discountPercentage: product.discountPercentage,
            newPrice: (product.price * (100 - product.discountPercentage) / 100).toFixed(2)
        }));

        res.json(suggestions);
    } catch (error) {
        console.error("Error in autocomplete:", error);
        res.json([]);
    }
};