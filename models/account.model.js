const mongoose = require('mongoose');
const generate = require('../helpers/generate.js');
const accountSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    phone:String,
    avatar:String,
    token:{
        type:String,
        default:generate.generate(20)
    },
    status:String,
    role:{
        type:String,
        default:"user"
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date,
}, { timestamps: true });
const Account = mongoose.model('Account', accountSchema, 'accounts');
module.exports = Account;