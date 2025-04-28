const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCatelogySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type:String,
        default:"",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type:Boolean,
        default:false,
    },
    deletedAt: Date,
    slug: { type: String, slug: "title",unique: true }
    },
    { timestamps: true });
const ProductCatelogy = mongoose.model('ProductCatelogy', productCatelogySchema, 'products-catelogy');
module.exports = ProductCatelogy;