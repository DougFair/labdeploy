const express = require("express");
const router = express.Router();
const Sitedetails = require("../models/Sitedetails.js");
const upload = require('../imageUpload');
const multer = require("multer");
const aws = require('aws-sdk');


router.get("/siteInfo", (req,res) => {
  console.log("Get site")
    Sitedetails.find({}, (error, site) => {
        if (error) {
          console.log(error)
        } else {
        res.json(site)
        }
        });
    })
    router.post("/siteInfo", (req,res) => {
      console.log("Get sitey" )
      console.log("Get sitey" + JSON.stringify(req.body))
        })


router.post("/createSite", (req,res) => {
    let site = req.body.site
    Sitedetails.create(site, function (err, site) {
      if (err){ 
          return console.error("error" + err);
      } else {
        console.log("New site created")
        res.json("Entry added");
      }
    });
  })

  router.put("/editSite", (req,res) => {
    let site = req.body.site
    console.log("Site: " + JSON.stringify(site))
    console.log("st" + site._id)
    Sitedetails.updateOne({_id: site._id}, site, function (err, site) {
      if (err){ 
          return console.error("error" + err);
      } else {
        console.log("Site Edited")
        res.json("Entry added");
      }
    });
  })

  module.exports = router;