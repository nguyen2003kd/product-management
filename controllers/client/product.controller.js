const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-catelogy.js");

module.exports.index = async (req, res) => {
    try {
        // Get current category from query params
        const currentCategory = req.query.category || "";

        // Fetch active categories
        const categories = await ProductCategory.find({
            deleted: false,
            status: "active"
        }).sort({ position: 'desc' });

        // Fetch products
        const find = {
            deleted: false,
            status: "active"
        };

        // Add category filter if specified
        if (currentCategory) {
            const category = await ProductCategory.findOne({ slug: currentCategory });
            if (category) {
                find.product_category_id = category._id;
            }
        }

        const products = await Product.find(find).sort({ position: 'desc' });

        // Calculate new prices
        const newProducts = products.map((item) => {
            item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);
            return item;
        });

        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            Product: newProducts,
            categories: categories,
            currentCategory: currentCategory
        });
    } catch (error) {
        console.error("Error in product listing:", error);
        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            Product: [],
            categories: [],
            currentCategory: ""
        });
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
        res.render("client/pages/products/detail.pug",{
            item:product,
            pageTitle:'chi tiet san pham'
        })
    }
    catch{
        res.redirect(`/product`)
    }
}