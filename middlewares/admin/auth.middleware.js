const systemAdmin=require('../../configs/system.js');
const AccountModel = require('../../models/account.model.js');
module.exports.requireAuth = async (req, res, next) => {
    if(!req.cookies.tkacc){
        return res.redirect(`${systemAdmin.ADMINROUTER}/auth`);
    }
    else{
        const account = await AccountModel.findOne({token:req.cookies.tkacc,deleted:false});
        if (!account) {
            return res.redirect(`${systemAdmin.ADMINROUTER}/auth`);
        }
        else
         next();
    }
}