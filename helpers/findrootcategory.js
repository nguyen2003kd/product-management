const categoryModel = require('../models/product-catelogy.js');

// Hàm tìm parent của một category theo id
async function getParentCategory(categoryId) {
    const category = await categoryModel.findOne({ _id: categoryId, status: "active", deleted: false });
    if (category && category.parent_id) {
        return await categoryModel.findOne({ _id: category.parent_id, status: "active", deleted: false });
    }
    return null;
}

// Hàm tìm category gốc
async function findRootCategory(categoryId) {
    const parentCategory = await getParentCategory(categoryId);
    if (parentCategory) {
        return await findRootCategory(parentCategory._id); // tiếp tục đệ quy
    }
    // Nếu không còn parent nữa, categoryId chính là root
    return await categoryModel.findOne({ _id: categoryId, status: "active", deleted: false });
}

module.exports.findRootCategory = findRootCategory;
