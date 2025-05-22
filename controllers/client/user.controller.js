const User = require("../../models/user.model");
const forgotPassword = require("../../models/forgot-password.model");
const cartModel = require("../../models/cart.model");
const generateTimeBasedOTP = require("../../helpers/generate-time-based-otp");
const argon2 = require("argon2");
const sendMail = require("../../helpers/sendmail");
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
        const cart = await cartModel.findOne({userId:user._id});
        if(cart){
            res.cookie("cartId", cart._id, {
                expires: new Date(Date.now() + 5 * 30 * 24 * 60 * 60 * 1000), // hoặc maxAge
            });

        }
        else{
            const carts = await cartModel.updateOne({_id:req.cookies.cartId},{$set:{userId:user._id}});
        }
        req.session.user = user._id;
        req.flash("info", "Đăng nhập thành công");
        res.redirect("/");
    }
};
//[GET] /logout
module.exports.logout = (req, res) => {
    res.clearCookie("cartId");
    delete req.session.user;
    delete res.locals.user;
    res.redirect("/");
};
//[GET] /forgot-password
module.exports.forgotPassword = (req, res) => {
    res.render("client/pages/user/forgot-password.pug", {
        pageTitle: "Quên mật khẩu"
    });
};
//[POST] /forgot-password
module.exports.forgotPasswordPost = async (req, res) => {
    const user = await User.findOne({ email: req.body.email ,deleted:false});
    if (!user) {
        req.flash("error", "Email không tồn tại");  
        return res.redirect("client/pages/user/forgot-password.pug");
    }
    const objOTP = {
        email: user.email,
        otp: generateTimeBasedOTP.generateTimeBasedOTP(6),
        expireAt: new Date(Date.now() + 1000 * 60 * 3) // 3 minutes
    };
    if(await forgotPassword.findOne({email:user.email})){
        await forgotPassword.deleteOne({email:user.email});
    }
    const forgotPasswords = await forgotPassword.create(objOTP);
    await sendMail.sendMail(objOTP.email, objOTP.otp);
    req.session.forgotPasswordOTP = forgotPasswords;
    res.render("client/pages/user/otp-authentication.pug");
};
//[GET] /otp-authentication
module.exports.otpAuthentication = (req, res) => {
    res.render("client/pages/user/otp-authentication.pug", {
        pageTitle: "Xác thực mã OTP"
    });
};
//[POST] /otp-authentication
module.exports.otpAuthenticationPost = async (req, res) => {
    const otp = await forgotPassword.findOne({email:req.session.forgotPasswordOTP.email,otp:req.body.otp,expireAt:{$gt:new Date()}});
    if(!otp){
        req.flash("error", "Mã OTP không chính xác");
        return res.redirect("client/pages/user/otp-authentication.pug");
    }
    res.render("client/pages/user/reset-password.pug");
}
//[POST] /resend-otp
module.exports.resendOTP = async (req, res) => {
    const objOTP = {
        email: req.session.forgotPasswordOTP.email,
        otp: generateTimeBasedOTP.generateTimeBasedOTP(6),
        expireAt: new Date(Date.now() + 1000 * 60 * 3) // 3 minutes
    }
    if(await forgotPassword.findOne({email:req.session.forgotPasswordOTP.email})){
        await forgotPassword.deleteOne({email:req.session.forgotPasswordOTP.email});
    }
    await forgotPassword.create(objOTP);
    await sendMail.sendMail(objOTP.email, objOTP.otp);
    res.render("client/pages/user/otp-authentication.pug");
}
//[GET] /reset-password
module.exports.resetPassword = (req, res) => {
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đặt lại mật khẩu"
    });
}
//[POST] /reset-password
module.exports.resetPasswordPost = async (req, res) => {
    const user = await User.findOne({ email: req.session.forgotPasswordOTP.email ,deleted:false});
    if (!user) {
        req.flash("error", "Email không tồn tại");  
        return res.redirect("/user/reset-password");
    }
    if(req.body.password !== req.body.confirmPassword){
        req.flash("error", "Mật khẩu không chính xác");
        return res.redirect("/user/reset-password");
    }
    user.password = await argon2.hash(req.body.password);
    await user.save();
    delete req.session.forgotPasswordOTP;
    req.flash("info", "Đặt lại mật khẩu thành công");
    res.redirect("/user/login");
}
//[GET] /info
module.exports.info = async(req, res) => {
    const user = await User.findOne({ _id: req.session.user, deleted: false });
    if (!user) {
        req.flash("error", "Tài khoản không tồn tại");
        return res.redirect("/user/login");
    }
    res.render("client/pages/user/info.pug", {
        pageTitle: "Thông tin tài khoản",
        user: user
    });
}
//[GET] /edit/:id
module.exports.edit = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id, deleted: false });
    res.render("client/pages/user/edit-user.pug", {
        pageTitle: "Chỉnh sửa thông tin tài khoản",
        user: user
    });
}
//[POST] /edit/:id
module.exports.editPost = async(req, res) => {
    console.log(req.body);
    const objUser = {
        deleted:false,
        _id: {$ne:req.params.id},
        email: req.body.email
    }
    const userExist = await User.findOne(objUser);
    if(userExist){
        req.flash("error", "Email đã tồn tại");
        return res.redirect("/user/edit/"+req.params.id);
    }
    else{
        await User.updateOne({ _id: req.params.id }, { $set: req.body });
        req.flash("info", "Cập nhật thông tin thành công");
        res.redirect("/user/info");
    }
}
//[PATCH] /change-password/:id
module.exports.changePasswordPost = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id, deleted: false });
    if(!await argon2.verify(user.password, req.body.currentPassword)){
        req.flash("error", "Mật khẩu hiện tại không chính xác");
        return res.redirect("/user/info");
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        req.flash("error", "Mật khẩu không chính xác");
        return res.redirect("/user/info");
    }
    user.password = await argon2.hash(req.body.newPassword);
    await User.updateOne({ _id: req.params.id }, { $set: { password: user.password } });
    req.flash("info", "Đổi mật khẩu thành công");
    res.redirect("/user/info");
}