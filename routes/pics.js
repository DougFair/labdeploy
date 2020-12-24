const express = require("express");
const router = express.Router();
const Labphoto = require("../models/Labphoto.js");
const upload = require('../imageUpload');
const deleteS3 = require("../deleteS3")
const deleteMultiS3 = require("../deleteMultiS3")

router.get("/pics", function(req,res){
    Labphoto.find({}, (error, pics) => {
    if (error) {
      console.log(error)
    } else {
    res.json(pics)
    }
    });
  })
  

router.post("/createPic", (req,res) => {
    console.log("pic route" + req.body.pic.picEvent)
    Labphoto.create({picEvent: req.body.pic.picEvent, picYear: req.body.pic.picYear, pics: req.body.pic.pics}, function (err, pic) {
      if (err){ 
          return console.error("Error" + err);
      } else {
        console.log("New lab photo created")
        res.json("Entry added");
      }
    });
  })
  

router.put("/editPic/:id", (req,res) => {
  let _id = req.params.id 
  let pics = req.body.pics
  console.log("editpics" + _id)
    Labphoto.updateOne({_id:_id}, {pics:pics}, (error, pics) => {
        if (error) {
            console.log(error)
        } else {
        console.log("Lab photo updated")
        res.json(pics);
        }
        });
    })


// router.delete("/deletePic/:id", (req,res) => {
//           Labphoto.deleteOne({_id:req.params.id}, function (err){
//             if(err){
//                 console.log("Error");
//             } else {
//                 res.json("deleted"); 
//             }
//         });
//     });


router.post("/labphotodelete/:id", (req,res,next) => {
    console.log("delete team memeber photo")
      deleteS3(req,res,next, req.params.id)
  }, (req,res) => {
      Labphoto.updateOne({_id:req.body.id}, {picPhotoPath:""}, function(err,teamMember){
          if(err){
              console.log("Error");
          } else {
          res.json(teamMember)
          }
      })
  })

  router.post("/labmultiphotodelete/:id", (req,res,next) => {
    console.log("delete multiphotos")
      deleteMultiS3(req,res,next, req.body.photoArray)
  }, (req,res) => {
      Labphoto.updateOne({_id:req.params.id}, {pics:[]}, function(err,teamMember){
          if(err){
              console.log("Error");
          } else {
          res.json(teamMember)
          }
      })
  })


router.post("/labPhotoCreate", upload.single("file"), function(req,res){
    console.log("create photo")
      const photo = req.file;
      const photoPath = req.file.location;
      if (!photo){
      res.redirect("/labphotoCreate");
      } else {
              res.json(photoPath);
          }
});
 

router.delete("/deleteEvent/:id", (req,res) => {
  Labphoto.deleteOne({_id:req.params.id}, function (err){
    if(err){
        console.log("Error");
    } else {
        res.json("deleted"); 
    }
});
});




module.exports = router;