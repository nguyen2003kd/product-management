const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-catelogy.js");
const creatTree = require('../../helpers/creatTree.js');

module.exports.category = async (req, res, next) => {
    const categories = await ProductCategory.find({
        deleted: false,
        status: "active"
    }).sort({ position: 'desc' });
    const createTrees = creatTree.creatTree(categories);
    res.locals.layoutCategories = createTrees;
    next();
}