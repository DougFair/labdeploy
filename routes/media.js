const express = require("express");
const router = express.Router();
const PDFfile = require("../models/PDFfile.js");
const upload = require('../imageUpload');
const aws = require('aws-sdk');
const deleteS3 = require("../deleteS3")
const fs = require('fs')

router.put("/pdfCreate/:id", upload.single("file"), (req,res) => {
    const pdfFile = req.file;
    const pdfPath = req.file.location;
    console.log("firstRouter")

    if (!pdfFile){
        res.redirect("/addMediaForm");
    } 
     if (pdfFile.mimetype !== "application/pdf"){
        res.redirect("/addMediaForm");
    }  else {
 
        PDFfile.updateOne ({_id:req.params.id}, {pdfPath:pdfPath, pdfAvailable: true}, function(err,file){
            if(err){
                console.log("Error");
            } else {
                res.json("file uploaded");
            }
        });
    }
});


router.put("/pdfCreateFirstPage/:id", upload.single("file"), (req,res) => {
    console.log("path2")
    const pdfFile = req.file;
    const pdfPath = req.file.location;
    console.log("secondRouter")
    if (!pdfFile){
        res.redirect("/addMediaForm");
    } 
     if (pdfFile.mimetype !== "application/pdf"){
        res.redirect("/addMediaForm");
    }  else {
 
        PDFfile.updateOne ({_id:req.params.id}, {pdfPathFirstPage:pdfPath}, function(err,file){
            if(err){
                console.log("Error");
            } else {
                res.json("file uploaded");
            }
        });
    }
});



router.post("/pdfdelete/:id", (req,res,next) => {
    deleteS3(req,res,next, req.params.id)
}, (req,res) => {
    PDFfile.updateOne({_id:req.body.id}, {pdfPath:""}, function(err,file){
        if(err){
        console.log("Error");
        } else {
        res.json("deleted")
        }
    })
})

router.post("/photodelete/:id", (req,res,next) => {
    deleteS3(req,res,next, req.params.id)
}, (req,res) => {
    PDFfile.updateOne({_id:req.body.id}, {photoPath:""}, function(err,file){
        if(err){
        console.log("Error");
        } else {
        res.json("deleted")
        }
    })
})

router.delete("/deletePDF/:id", (req,res,next) => {
    let path = req.params.id
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-2',
    });
    
    var params = {  Bucket: process.env.S3_BUCKET, Key: path };
    app.use(bodyParser.json());
    
    const s3 = new aws.S3();

    s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else     console.log();                 // deleted
    });
    res.json("deleted")
})
    
router.put("/photoCreate/:id", upload.single("file"), function(req,res){
    const photo = req.file;
    const photoPath = req.file.location;
    if (!photo){
    res.redirect("/photoCreate");
    } else {

    PDFfile.updateOne({_id:req.params.id}, {photoPath:photoPath}, function(err,photos){
        if(err){
            console.log("Error");
        } else {
            res.json("photo uploaded");
        }
    });
}
});    

router.put("/updateDisplayPage", (req,res) => {
    let id = req.body.id
    let displayPage = req.body.displayPage

    PDFfile.updateOne({_id:id}, {displayPage}, (error, paper) => {
        if (error) {
            console.log(error)
        } else {
        res.json(paper);
        }
        });
    })

router.put("/updatePDFAvailable", (req,res) => {
        console.log("node" + req.body.pdfAvailable)
        let id = req.body.id
        let pdfAvailable = req.body.pdfAvailable
    
        PDFfile.updateOne({_id:id}, {pdfAvailable}, (error, paper) => {
            if (error) {
                console.log(error)
            } else {
            res.json(paper);
            }
            });
        })
    

router.delete("/deletePhoto/:id", function(req, res){
    Photo.deleteOne({id: req.params.id}, (err) => {
        if (err) {
            console.log("Error");
        } else {
            res.redirect("/photoCreate");
        }
    });
});

module.exports = router;