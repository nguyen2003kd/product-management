const User = require("../../models/user.model.js");
module.exports.requireUser = async (req, res, next) => {
    if (req.session.user) {
        const user = await User.findById({_id:req.session.user,deleted:false,status:"active"}).select("-password");
        if (user) {
            res.locals.user = user;
        }
    }
    next();
}
