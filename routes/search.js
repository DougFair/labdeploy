const express = require("express");
const router = express.Router();
const axios = require('axios')
const PDFfile = require("../models/PDFfile.js");

router.get("/addPaperSearch", function(req,res){
    res.render("addPapersSearch");
});

router.get("/displayPapers", function(req,res){
  PDFfile.find({}, (error, papers) => {
  if (error) {
    console.log(error)
  } else {
  res.json(papers)
  // res.render("displayPapers", {papers:papers});
  }
  });
})


// router.post("/search", function(req,res){
//   let url=""
//   let author=req.body.author
//   let title=req.body.title
  
//   if(author){
//     url =  `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${author}[Author]`
//   }  else {
//     if(title) {
//       url =  `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${title}[Title]`
//     }
//   }
  
//     let idlist=[]
//     let paperList= []
//     // const url =  `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${author}[Author]`
//     axios.get(url)
//     .then(response => {
//     idlist = response.data.esearchresult.idlist.toString()
//     const url2 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${idlist}`
//     axios.get(url2)
//     .then(response1 => {
//         let myObj=response1.data.result
//             Object.keys(myObj).forEach(key => {
//               let paperObj = {}
//               if (key !== "uids") {
//               let pmid = myObj[key].uid
//               let title = myObj[key].title
//               let  journal = myObj[key].fulljournalname
//               let  volume = myObj[key].volume
//               let  pages = myObj[key].pages
//               let  doi = myObj[key].elocationid
//               let  authors = myObj[key].authors
//               let  year = myObj[key].pubdate.slice(0,4)

//               let authorList = []
//               authors.map((author, idx) =>
//               idx > 0
//                 ? authorList.push(" " + author.name)
//                 : authorList.push(author.name)
//               )

//             paperObj.pmid = pmid;
//             paperObj.title = title;
//             paperObj.journal = journal;
//             paperObj.volume = volume;
//             paperObj.pages = pages;
//             paperObj.authors = authorList.toString();
//             paperObj.doi = doi;
//             paperObj.year = year;
//             paperList.push(paperObj)
//             }})      
//           })
//           .then(response => {
//         res.render("displayPapersSearch", {paperList:paperList})
//         })
//     });
// })


router.post("/paperSelect", (req,res) => {
  let selectedList = req.body.papers
  PDFfile.create(selectedList, function (err, papers) {
    if (err){ 
        return console.error("rrror" + err);
    } else {
      console.log("Multiple documents inserted to Collection")
      res.json("Entry added");
    }
  });
})



module.exports = router;