module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', 'vui lòng điền Ho va ten !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.email) {
        req.flash('error', 'vui lòng điền email !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.phone) {
        req.flash('error', 'vui lòng điền số điện thoại !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.password) {
        req.flash('error', 'vui lòng nhập password !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.confirmPassword) {
        req.flash('error', 'vui lòng nhập xác nhận password !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    next();
}
module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'vui lòng điền email !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.password) {
        req.flash('error', 'vui lòng nhập password !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    next();
}
module.exports.editPatch = (req, res, next) => {
    if (!req.body.fullname) {
        req.flash('error', 'vui lòng điền Ho va ten !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.email) {
        req.flash('error', 'vui lòng điền email !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    else if (!req.body.phone) {
        req.flash('error', 'vui lòng điền số điện thoại !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    next();
}