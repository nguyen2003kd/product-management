const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-catelogy.js");
const creatTree = require('../../helpers/creatTree.js');
const newPrices = require('../../helpers/newPrices.js');
module.exports.index = async (req, res) => {
    try {
        // Fetch featured products with multiple sorting criteria
        const featuredProducts = await Product.find({
            deleted: false,
            status: "active",
            featured: "1"
        })
        .sort({ 
            position: 'desc',
            createdAt: 'desc',
            view: 'desc'  // Also consider product views
        })
        .limit(12);  // Increased from 8 to 12 products     
        // Calculate new prices for featured products
        const products = newPrices(featuredProducts);

        // Fetch new arrivals (latest products)
        const newArrivals = await Product.find({
            deleted: false,
            status: "active"
        }).sort({ createdAt: 'desc' }).limit(16);  // Increased from 4 to 8 products

        // Calculate new prices for new arrivals
        const latestProducts = newPrices(newArrivals);

        res.render("client/pages/home/index.pug", {
            pageTitle: "Trang chủ",
            featuredProducts: products,
            latestProducts: latestProducts
        });
    } catch (error) {
        console.error("Error in homepage:", error);
        res.render("client/pages/home/index.pug", {
            pageTitle: "Trang chủ",
            categories: [],
            featuredProducts: [],
            latestProducts: []
        });
    }
}