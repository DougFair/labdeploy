const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js");
const upload = require('../imageUpload');
const deleteS3 = require("../deleteS3")

router.get("/blogPosts", function(req,res){
    Blog.find({}, (error, blogs) => {
    if (error) {
      console.log(error)
    } else {
    res.json(blogs)
    }
    });
  })
  

router.post("/createBlogPost", (req,res) => {
    Blog.create({blogTitle: req.body.post.blogPostTitle, blogText: req.body.post.blogPostText, blogPhotoPath: req.body.post.blogPhotoPath, blogLink: req.body.post.blogPostLink}, function (err, blogPost) {
      if (err){ 
          return console.error("Error" + err);
      } else {
        console.log("New Blog item created")
        res.json("Entry added");
      }
    });
  })
  

router.put("/updateBlogPost", (req,res) => {
    let id = req.body.post.id
    let blogTitle = req.body.post.blogTitle
    let blogText = req.body.post.blogText
    let blogPhotoPath = req.body.post.blogPhotoPath
    let blogLink = req.body.post.blogLink
    let dateUpdated = Date.now()

    Blog.updateOne({_id:id}, {blogTitle: blogTitle, blogText: blogText, dateUpdated:dateUpdated, blogPhotoPath: blogPhotoPath, blogLink: blogLink}, (error, blogItem) => {
        if (error) {
            console.log(error)
        } else {
        console.log("Blog item updated", JSON.stringify(blogItem))
        res.json(blogItem);
        }
        });
    })


router.delete("/deleteBlogPost/:id", (req,res) => {
        Blog.deleteOne({_id:req.params.id}, function (err){
            if(err){
                console.log("Error");
            } else {
                res.json("deleted"); 
            }
        });
    });


router.post("/blogphotodelete/:id", (req,res,next) => {
        deleteS3(req,res,next, req.params.id)
    }, (req,res) => {
        Blog.updateOne({_id:req.body.id}, {blogPhotoPath:""}, function(err, document){
            if(err){
                console.log("Error");
            } else {
            res.json(document)
            }
        })
    })
  
    

router.post("/blogPhotoCreate", upload.single("file"), function(req,res){
      const photo = req.file;
      const photoPath = req.file.location;
      if (!photo){
      // req.flash("error", "You didnt upload a file");
      res.redirect("/photoCreate");
      } else {
              res.json(photoPath);
          }
});
 


module.exports = router