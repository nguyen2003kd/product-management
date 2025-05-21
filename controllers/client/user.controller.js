const User = require("../../models/user.model");
const argon2 = require("argon2");
module.exports.register = (req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng ký"
    });
};
//[POST] /register
module.exports.registerPost = async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu không khớp");
        return res.redirect("/user/register");
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
        req.flash("error", "Email đã tồn tại");
        return res.redirect("/user/register");
    }
    req.body.password= await argon2.hash(req.body.password);
    const user=await User.create(req.body);
    req.session.user = user._id;
    req.flash("info", "Đăng ký thành công");
    res.redirect("/");
};
//[GET] /login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    });
};
//[POST] /login
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({ email:req.body.email,deleted:false});
    if (!user) {
        req.flash("error", "Email không tồn tại");
        return res.redirect("/user/login"); 
    }
    else if (!await argon2.verify(user.password, req.body.password)) {
        req.flash("error", "Mật khẩu không chính xác");
        return res.redirect("/user/login");
    }
    else if(user.status=="inactive"){
        req.flash("error", "Tài khoản đã bị khóa");
        return res.redirect("/user/login");
    }
    else{
        req.session.user = user._id;
        req.flash("info", "Đăng nhập thành công");
        res.redirect("/");
    }
};
//[GET] /logout
module.exports.logout = (req, res) => {
    req.session.destroy();
    delete res.locals.user;
    res.redirect("/");
};

