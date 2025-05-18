const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-catelogy.js");
const getSubCategory = require("../../helpers/getsubcategory.js");
const newPrice = require("../../helpers/newPrices.js");
module.exports.index = async (req, res) => {
    try {
        // Fetch products
        const find = {
            deleted: false,
            status: "active"
        };
        const products = await Product.find(find).sort({ position: 'desc' })
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
        product=await Product.findOne(find)
        const category=await ProductCategory.findOne({_id:product.product_category_id})
        product.newPrice=(product.price * (100 - product.discountPercentage) / 100).toFixed(2)
        res.render("client/pages/products/detail.pug",{
            item:product,
            category:category,
            pageTitle:'chi tiet san pham'
        })
    }
    catch(error){
        console.log(error)
        res.redirect(`/product`)
    }
}