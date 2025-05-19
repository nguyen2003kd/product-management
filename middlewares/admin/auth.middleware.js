const systemAdmin=require('../../configs/system.js');
const AccountModel = require('../../models/account.model.js');
const rolesModel = require('../../models/roles.model.js');
module.exports.requireAuth = async (req, res, next) => {
    if(!req.session.user){
        return res.redirect(`${systemAdmin.ADMINROUTER}/auth`);
    }
    else{
        const account = req.session.user
        const role = await rolesModel.findOne({_id:account.role}).select('title permissions');
        res.locals.account = account;
        res.locals.roleList = role;
        next();
    }
}