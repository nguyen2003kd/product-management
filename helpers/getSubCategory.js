const categoryModel = require('../models/product-catelogy.js');
async function getSubCategory(perentid){
    const subCategory = await categoryModel.find({
        parent_id: perentid,
        status:"active",
        deleted:false
    });
    let allsubcategory = [...subCategory];
    for(const sub of subCategory){  
        const child = await getSubCategory(sub._id);
        allsubcategory = allsubcategory.concat(child);
    }
    return allsubcategory;
}
module.exports.getSubCategory = getSubCategory;
