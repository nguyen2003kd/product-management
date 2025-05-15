const systemAdmin=require('../../configs/system.js');
const AccountModel = require('../../models/account.model.js');
const rolesModel = require('../../models/roles.model.js');
module.exports.requireAuth = async (req, res, next) => {
    if(!req.cookies.tkacc){
        return res.redirect(`${systemAdmin.ADMINROUTER}/auth`);
    }
    else{
        const account = await AccountModel.findOne({token:req.cookies.tkacc,deleted:false}).select('-password');
        if (!account) {
            return res.redirect(`${systemAdmin.ADMINROUTER}/auth`);
        }
        else{
            const role = await rolesModel.findOne({_id:account.role}).select('title permissions');
            res.locals.account = account;
            res.locals.roleList = role;
            next();
        }
    }
}