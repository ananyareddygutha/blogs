var blog = require('../models/blog.js');

var middlewareObj = {};

middlewareObj.checkBlogOwnership = function checkBlogOwnership(req,res,next){
    if(req.isAuthenticated()){
        blog.findById(req.params.id,function(err,blog){
            if(err){
                res.redirect("back");
            }
            else{
                if(blog.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You are not allowed to do that!")
                    res.redirect("back")
                }
            }
        })
    }
    else{
        req.flash("error","You have to be logged in to do that!")
        res.redirect("/login")
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("error","You have to be logged in to do that!")
        res.redirect("/login")
    }
}

module.exports = middlewareObj;