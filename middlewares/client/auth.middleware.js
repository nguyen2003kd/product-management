const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
    if(!req.session.user){
        return res.redirect(`/user/login`);
    }
    else{
        const user = await User.findById({_id:req.session.user,deleted:false,status:"active"}).select("-password");
        if (user) {
            res.locals.user = user;
        }
        next();
    }
}