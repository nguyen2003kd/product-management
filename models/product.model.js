const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    product_category_id:{
        type: String,
        default: ""
    },
    created_by: {
        account_id: String,
        created_at: {
            type: Date,
            default: Date.now
        },
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted_by: {
        account_id: String,
        deletedAt: Date,
    },
    deleted: {
        type:Boolean,
        default:false,
    },
    updated_by: [{
        account_id: String,
        updatedAt: Date,
    }],
    slug: { type: String, slug: "title",unique: true }
    },
    { timestamps: true });
const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;