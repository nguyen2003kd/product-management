const AccountModel = require('../../models/account.model');
const argon2 = require('argon2');
module.exports.login = (req, res) => {
    if(!req.cookies.tkacc){
    res.render('admin/pages/auth/login', {
        pageTitle: 'Đăng nhập',
    });}
    else{
        res.redirect('/admin/product')
    }

}
// [POST] /admin/auth/login
module.exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await AccountModel.findOne({ email: email, deleted: false });
        if (!account) {
            req.flash('error', 'Tài khoản không tồn tại');
            return res.redirect('/admin/auth');
        }
        if(account.status=="inactive"){
            req.flash('error', 'Tài khoản đã bị khóa');
            return res.redirect('/admin/auth');
        }
        if (await argon2.verify(account.password, password)) {
            req.session.user = account;
            // res.cookie('tkacc',account.token,)
            req.flash('info', 'Đăng nhập thành công');
            res.redirect('/admin/dashboard');
        }
        else {
            req.flash('error', 'Mật khẩu không đúng');
            res.redirect('/admin/auth');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server Error');
        }
        res.clearCookie('tkacc')
        res.redirect('/admin/auth');
    });
}


    