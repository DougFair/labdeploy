const express = require("express");
const router = express.Router();
const Project= require("../models/Project.js");
const upload = require('../imageUpload');
const deleteS3 = require("../deleteS3")

router.get("/projects", function(req,res){
    Project.find({}, (error, projects) => {
    if (error) {
      console.log(error)
    } else {
    res.json(projects)
    }
    });
})

router.post("/createProject", (req,res) => {
    Project.create({projectTitle: req.body.project.projectTitle, 
        projectDescription: req.body.project.projectDescription,
        projectPhotoPath: req.body.project.projectPhotoPath, 
        projectFunding: req.body.project.projectFunding,}, function (err, project) {
      if (err){ 
          return console.error("Error" + err);
      } else {
        console.log("New project created")
        res.json("Entry added");
      }
    });
})
  

router.put("/editProject", (req,res) => {
    console.log("puttttt")
    let id = req.body.project.id

    Project.updateOne({_id:id}, {projectTitle: req.body.project.projectTitle, 
        projectDescription: req.body.project.projectDescription,
        projectPhotoPath: req.body.project.projectPhotoPath, 
        projectFunding: req.body.project.projectFunding,}, (error, project) => {
        if (error) {
            console.log(error)
        } else {
        console.log("Project updated", JSON.stringify(project))
        res.json(project);
        }
        });
    })


router.delete("/deleteProject/:id", (req,res) => {
        console.log("body" + JSON.stringify(req.body))
          let id =  req.params.id
          console.log("id" + id)
        Project.deleteOne({_id:id}, function (err){
            if(err){
                console.log("Error");
            } else {
                res.json("deleted"); 
            }
        });
    });


router.post("/projectphotodelete/:id", (req,res,next) => {
    console.log("delete team member photo")
      deleteS3(req,res,next, req.params.id)
  }, (req,res) => {
      Project.updateOne({_id:req.body.id}, {projectPhotoPath:""}, function(err,project){
          if(err){
              console.log("Error");
          } else {
          res.json(project)
          }
      })
  })


router.post("/projectPhotoCreate", upload.single("file"), function(req,res){
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