const AccountModel = require('../../models/account.model.js');
const roleModel = require('../../models/roles.model.js');
//thư viện argon2 dùng để mã hóa mật khẩu
const argon2 = require('argon2');
module.exports.index = async (req, res) => {
    const find={deleted:false}
    const accounts = await AccountModel.find(find).select('-password -token')
    for (const item of accounts) {
        const role = await roleModel.findById({_id: item.role});
        item.role = role ? role.title : 'Chưa phân quyền hoặc quyền không tồn tại';
    }
    res.render('admin/pages/accounts/index',{
        pageTitle: 'Quản lý tài khoản',
        accounts: accounts,
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
            req.flash('error', `Email ${req.body.email} đã tồn tại`);
            return res.redirect('/admin/accounts/create');
        }
        else{
            req.body.password= await argon2.hash(req.body.password);
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
// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const roles = await roleModel.find({ deleted: false });
        const account = await AccountModel.findById(req.params.id).select('-password -token');
        if (!account) {
            req.flash('error', 'Tài khoản không tồn tại');
            return res.redirect('/admin/accounts');
        }
        res.render('admin/pages/accounts/edit', {
            pageTitle: 'Chỉnh sửa tài khoản',
            roles: roles,
            account: account,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
// [PATCH] /admin/accounts/edit/:id
module.exports.patchEdit = async (req, res) => {
    try {
        const find={
            deleted:false,
            _id: {$ne:req.params.id},
            email: req.body.email
        }
        const account = await AccountModel.findOne(find)

        if (account) {
            req.flash('error', 'Email đã tồn tại');
            return res.redirect('/admin/accounts');
        }
        else{
            if (req.body.password) {
                req.body.password = await argon2.hash(req.body.password);
            } 
            else {
                delete req.body.password; // Xóa password khỏi đối tượng nếu không có giá trị mới
            }
            await AccountModel.updateOne({ _id: req.params.id }, req.body);
            req.flash('info', 'Cập nhật tài khoản thành công');
            res.redirect('/admin/accounts');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}