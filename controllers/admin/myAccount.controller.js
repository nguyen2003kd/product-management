const accountModel = require('../../models/account.model');
module.exports.index = async (req, res) => {
    res.render('admin/pages/my-account/index', 
        { accountInfo: res.locals.account }            
    );
}
