var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require("../models/user.js");

//routes to register new user
router.get("/register",function(req,res){
    res.render("../views/Auth/register",{referer : req.headers.referer});
})
router.post("/register",function(req,res){
    var referer = req.body.referer;
    var newUser = new User({username : req.body.username,email : req.body.email});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash('error',err.message);
            res.redirect("/register");
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success',"Successfully Registered, Welcome to RSblogs!");
            res.redirect(referer);
        })
    })
})

//routes to login user
router.get("/login",function(req,res){
    res.render("../views/Auth/login",{referer : req.headers.referer});
})
router.post("/login",passport.authenticate('local',{
    failureRedirect : "/login",
    failureFlash : true
}),function(req,res){   
    req.flash('success',"Successfully Logged in, Welcome to RSblogs!");
    res.redirect(req.body.referer);
})

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!")
    res.redirect(req.headers.referer);
})

module.exports = router;
