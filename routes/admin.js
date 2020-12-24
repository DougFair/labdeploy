const express = require("express");
const router = express.Router();
const PDFfile = require("../models/PDFfile.js");


router.post("/addPaperManual", (req,res) => {
    let title = req.body.paper.title
    if (title[-1] !== ".") title = `${title}.`
    let authors = req.body.paper.authors
    let journal = req.body.paper.journal
    let volume = req.body.paper.volume
    let pages = req.body.paper.pages
    let year = req.body.paper.year
    let pmid = req.body.paper.pmid
    let type = req.body.paper.type
    let comments = req.body.paper.comments
    PDFfile.create({title:title, authors:authors, journal:journal, volume:volume, pages:pages, year:year, pmid:pmid, type:type, comments: comments}, (error, paper) => {
        if(error){
            console.log(error) 
            } else {
            console.log("Documents inserted to Collection")
            }    
            res.json("Paper added manually")
    })
})


router.delete("/deletePaper", (req,res) => {
    let idList= req.body.papers
    PDFfile.deleteMany({_id:{$in: idList}}, function (err){
        if(err){
            console.log("Error");
        } else {
            res.json("deleted"); 
        }
    });
});


router.get("/updatePaper", (req,res) => {
    PDFfile.find({}, (error, papers) => {
        if (error) {
          console.log(error)
        } else {
        res.json(papers)
        }
    });
});

router.put("/updatePaper", (req,res) => {
    let title= req.body.paper.title
    let authors = req.body.paper.authors
    let journal = req.body.paper.journal
    let volume = req.body.paper.volume
    let pages = req.body.paper.pages
    let year = req.body.paper.year
    let pmid = req.body.paper.pmid
    let type = req.body.paper.type
    let comments = req.body.paper.comments

    PDFfile.updateOne({_id:req.body.paper.id}, {title:title, authors:authors, journal:journal, volume:volume, pages:pages, year:year, pmid:pmid, type:type, comments: comments}, (error, paper) => {
        if (error) {
            console.log(error)
        } else {
        res.json(paper);
        }
        });
    })


// router.get("/addMedia", (req,res) => {
//     PDFfile.find({}, (error, papers) => {
//         if (error) {
//             console.log(error)
//         } else {
//         res.render("addMedia", {papers:papers});
//         }
//         });
//     })
      
// router.post("/addMedia", (req,res) => {
//     let id = ""
//     let allSelections = req.body.selection   
//     allSelections.map((item,idx) => {
//         if(item == "1")id = req.body.id[idx]  
//     }) 
//     PDFfile.findById(id, (error, paper) => {
//         if (error) {
//             console.log(error)
//         } else {
//         res.render("addMediaForm", {paper:paper});
//         }
//         });
// })

module.exports = router