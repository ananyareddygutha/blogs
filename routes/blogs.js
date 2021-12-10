var express = require("express");
var router = express.Router();
var middlewareObj = require('../middleware/index.js');

//Requiring the model
var blog = require("../models/blog.js");

//Landing page
router.get("/",function(req,res){
    res.redirect("/blogs");
})

//1.index- Index page
router.get("/blogs",function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log("SOMETHING WENT WRONG!!");
        }
        else{
            console.log(req.user);
            res.render("../views/Blogs/home",{blogs : blogs});
        }
    })
})
//2.new- renders form to create a new blog
router.get("/blogs/new",middlewareObj.isLoggedIn,function(req,res){
    res.render("../views/Blogs/new");
})
//3.create- Takes data from the new form and creates a new blog
router.post("/blogs",middlewareObj.isLoggedIn,function(req,res){
    req.body.description = req.sanitize(req.body.description);
    blog.create({
        author : {id : req.user._id, username : req.user.username},
        title : req.body.title,
        image : req.body.image,
        description : req.body.description
    },function(err,blog){
        if(err)
            console.log("SOMETHING WENT WRONG!!!");
        else{
            console.log("New Blog has Been added Successfully");
            console.log(blog);
            res.redirect("/blogs");
        }
    })
})
//4.show- renders show page of a particular blog
router.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(err,post){
        console.log(post);
        if(err){
            console.log("SOMETHING WENT WRONG!!");
        }
        else{
            res.render("../views/Blogs/show",{post : post});
        }
    })
}) 
//5.edit- renders edit form for the particular blog
router.get("/blogs/:id/edit",middlewareObj.checkBlogOwnership,function(req,res){
    blog.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
            res.send("OOPS could not the find the page");
        }
        else{
            res.render("../views/Blogs/edit.ejs",{post:post})
        }
    })
})
//6.update - updating the blog from the information we got from edit form
router.put("/blogs/:id",middlewareObj.checkBlogOwnership,function(req,res){
    req.body.description = req.sanitize(req.body.description);
    blog.findByIdAndUpdate(req.params.id,req.body,function(err,post){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }
        else{
            req.flash("success","Blog has been successfully updated!")
            res.redirect("/blogs/" + post._id);
        }
    })
})
//7.destroy - deletes the post from the database
router.delete("/blogs/:id",middlewareObj.checkBlogOwnership,function(req,res){
    console.log("put hello");
    blog.findByIdAndRemove(req.params.id,function(err,post){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }
        else{
            console.log("A blog has been removed successfully");
            req.flash("success","Blog has been successfully deleted!")
            res.redirect("/blogs");
        }
    })
})

module.exports = router;