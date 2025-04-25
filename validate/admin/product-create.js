module.exports.createPost=(req,res,next)=>{
    if(req.body.title==""){
        req.flash('error', 'vui lòng điền title !');
        res.redirect(req.headers.referer || '/');
        return;
    }
    next()
}