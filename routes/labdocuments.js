const express = require("express");
const router = express.Router();
const Labdocument = require("../models/Labdocument.js");
const upload = require('../imageUpload');
const deleteS3 = require("../deleteS3")

router.get("/labdocuments", function(req,res){
    Labdocument.find({}, (error, blogs) => {
    if (error) {
      console.log(error)
    } else {
    res.json(blogs)
    }
    });
  })
  

router.post("/createLabDocument", (req,res) => {
    Labdocument.create({documentName: req.body.document.documentName, documentCategory: req.body.document.documentCategory, documentPreparedBy: req.body.document.documentPreparedBy, documentFilePath: req.body.document.documentFilePath}, function (err, labdocument) {
      if (err){ 
          return console.error("Error" + err);
      } else {
        console.log("New labdocument created")
        res.json("Entry added");
      }
    });
  })
  

router.put("/editLabDocument", (req,res) => {
    Labdocument.updateOne({_id:req.body.post._id}, {documentName: req.body.post.documentName, documentCategory: req.body.post.documentCategory, documentPreparedBy: req.body.post.documentPreparedBy, documentFilePath: req.body.post.documentFilePath}, (error, labdocument) => {
        if (error) {
            console.log(error)
        } else {
        console.log("Lab document updated", JSON.stringify(labdocument))
        res.json(labdocument);
        }
        });
    })


router.delete("/deleteLabDocument/:id", (req,res) => {
        console.log("body" + JSON.stringify(req.body))
          let id =  req.params.id
          console.log("id" + id)
          Labdocument.deleteOne({_id:id}, function (err){
            if(err){
                console.log("Error");
            } else {
                res.json("deleted"); 
            }
        });
    });


router.post("/labdocumentphotodelete/:id", (req,res,next) => {
    console.log("delete team memeber photo")
      deleteS3(req,res,next, req.params.id)
  }, (req,res) => {
      Labdocument.updateOne({_id:req.body.id}, {documentFilePath:""}, function(err, document){
          if(err){
              console.log("Error");
          } else {
          res.json(document)
          }
      })
  })


router.post("/labdocumentPDFupload", upload.single("file"), function(req,res){
      const photo = req.file;
      const pdfPath = req.file.location;
      if (!photo){
      // req.flash("error", "You didnt upload a file");
      res.redirect("/photoCreate");
      } else {
            res.json(pdfPath);
        }
});
 

module.exports = router;