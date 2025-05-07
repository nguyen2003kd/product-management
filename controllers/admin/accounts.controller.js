const AccountModel = require('../../models/account.model.js');
const roleModel = require('../../models/roles.model.js');
//thư viện argon2 dùng để mã hóa mật khẩu
const argon2 = require('argon2');
module.exports.index = async (req, res) => {
    res.render('admin/pages/accounts/index',{
        pageTitle: 'Quản lý tài khoản',
    });
}
// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    try {
        const roles = await roleModel.find({ deleted: false });
        res.render('admin/pages/accounts/create', {
            pageTitle: 'Thêm tài khoản mới',
            roles: roles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
// [POST] /admin/accounts/create
module.exports.postCreate = async (req, res) => {
    try {
        const emailExist = await AccountModel.findOne({ email: req.body.email, deleted: false });
        if (emailExist) {
            req.flash('error', 'Email đã tồn tại');
            return res.redirect('/admin/accounts/create');
        }
        else{
            req.body.password=await argon2.hash(req.body.password);
            const newAccount = new AccountModel(req.body);
            await newAccount.save();      
            req.flash('info', 'Thêm tài khoản thành công');
            res.redirect('/admin/accounts');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}