const Product = require("../../models/product.model.js");
module.exports.index=async(req, res) => {
    const product =await Product.find({
        deleted: false,
        status: "active",
    }).sort({position:'desc'})
    const newProducts = product.map((item) => {
        item.newPrice = (item.price * (100-item.discountPercentage) / 100).toFixed(2);
        return item;
    })
    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang chi tiết san phẩm",
        Product: newProducts,
    });
}