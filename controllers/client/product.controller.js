const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-catelogy.js");
const getSubCategory = require("../../helpers/getsubcategory.js");
const newPrice = require("../../helpers/newPrices.js");
const findRootCategory = require("../../helpers/findrootcategory.js");
module.exports.index = async (req, res) => {
    try {
        // Fetch products
        const find = {
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
        const products = await Product.find(find).sort({ position: 'desc' })
        for(const item of products){
            if(item.product_category_id){
                const category = await ProductCategory.findOne({_id:item.product_category_id})
                item.category = category
            }
        }
        // Calculate new prices
        const newProducts = products.map((item) => {
            item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);
            return item;
        });
        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            Product: newProducts,
        });
    } catch (error) {
        console.error("Error in product listing:", error);
        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            Product: [],
        });
    }
}
//[GET] /product/:slug
module.exports.category = async(req, res) => {
    try {
        let find = {
            deleted: false,
            status: "active",
            slug: req.params.slug
        };
        const category = await ProductCategory.findOne(find);
        if(!category) {
            return res.redirect(`/product`);
        }
        const subCategory = await getSubCategory.getSubCategory(category._id);
        const subCategoryList = subCategory.map(item=>item._id);
        const products = await Product.find({
            deleted: false,
            status: "active",
            product_category_id: {$in:[category._id,...subCategoryList]}
        });
        for(const item of products){
            if(item.product_category_id){
                const category = await ProductCategory.findOne({_id:item.product_category_id})
                item.category = category
            }
        }
        res.render("client/pages/products/index.pug", {
            pageTitle: category.title,
            Product: products,
            currentCategory: category.slug
        });
    } catch(error) {
        console.log(error);
        res.redirect(`/product`);
    }
}

module.exports.detail=async(req,res)=>{
    try{
        let find={
            status:'active',
            deleted:false,
            slug:req.params.slug
        }
        let product=await Product.findOne(find)
        const category=await ProductCategory.findOne({_id:product.product_category_id})
        const rootCategory = await findRootCategory.findRootCategory(category._id);
        product=newPrice.newPrice(product)
        const subCategory = await getSubCategory.getSubCategory(rootCategory._id);
        const subCategoryList = subCategory.map(item=>item._id);
        const filteredCategoryIds = [rootCategory._id,...subCategoryList].filter(id => id.toString() !== category._id.toString());
        const products = await Product.find({
            deleted: false,
            status: "active",
            product_category_id: {$in:filteredCategoryIds}
        });
        for(const item of products){
            if(item.product_category_id){
                const category = await ProductCategory.findOne({_id:item.product_category_id})
                item.category = category
            }
        }
        res.render("client/pages/products/detail.pug",{
            item:product,
            category:category,
            pageTitle:'chi tiet san pham',
            relatedProducts:products
        })
    }
    catch(error){
        console.log(error)
        res.redirect(`/product`)
    }
}