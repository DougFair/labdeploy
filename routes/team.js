const express = require("express");
const router = express.Router();
const Team= require("../models/Team.js");
const upload = require('../imageUpload');
const deleteS3 = require("../deleteS3")

router.get("/teamMembers", function(req,res){
    Team.find({}, (error, blogs) => {
    if (error) {
      console.log(error)
    } else {
    res.json(blogs)
    }
    });
  })
  

router.post("/createTeamMember", (req,res) => {
    console.log("team route")
    Team.create({teamMemberName: req.body.post.teamMemberName, teamMemberPosition: req.body.post.teamMemberPosition, teamMemberDescription: req.body.post.teamMemberDescription,teamMemberPhotoPath: req.body.post.teamMemberPhotoPath, teamMemberEmail: req.body.post.teamMemberEmail, rank: req.body.post.rank, aspect: req.body.post.aspect}, function (err, teamMember) {
      if (err){ 
          return console.error("Error" + err);
      } else {
        console.log("New team member created")
        res.json("Entry added");
      }
    });
  })
  

router.put("/editTeamMember", (req,res) => {
    let id = req.body.post.id
    let teamMemberName= req.body.post.teamMemberName 
    let teamMemberPosition = req.body.post.teamMemberPosition
    let teamMemberDescription= req.body.post.teamMemberDescription
    let teamMemberPhotoPath = req.body.post.teamMemberPhotoPath
    let teamMemberEmail = req.body.post.teamMemberEmail
    let rank = req.body.post.rank
    let aspect = req.body.post.aspect

    Team.updateOne({_id:id}, {teamMemberName: teamMemberName, teamMemberPosition: teamMemberPosition, teamMemberDescription: teamMemberDescription,teamMemberPhotoPath: teamMemberPhotoPath, teamMemberEmail: teamMemberEmail,rank: rank, aspect: aspect}, (error, teamMember) => {
        if (error) {
            console.log(error)
        } else {
        console.log("Team member updated", JSON.stringify(teamMember))
        res.json(teamMember);
        }
        });
    })


router.delete("/deleteTeamMember/:id", (req,res) => {
        console.log("body" + JSON.stringify(req.body))
          let id =  req.params.id
          console.log("id" + id)
        Team.deleteOne({_id:id}, function (err){
            if(err){
                console.log("Error");
            } else {
                res.json("deleted"); 
            }
        });
    });


router.post("/teammemberphotodelete/:id", (req,res,next) => {
    console.log("delete team memeber photo")
      deleteS3(req,res,next, req.params.id)
  }, (req,res) => {
      Team.updateOne({_id:req.body.id}, {teamMemberPhotoPath:""}, function(err,teamMember){
          if(err){
              console.log("Error");
          } else {
          res.json(teamMember)
          }
      })
  })


router.post("/teamMemberPhotoCreate", upload.single("file"), function(req,res){
      const photo = req.file;
      const photoPath = req.file.location;
      if (!photo){
      // req.flash("error", "You didnt upload a file");
      res.redirect("/photoCreate");
      } else {
              res.json(photoPath);
          }
});
 

module.exports = router;