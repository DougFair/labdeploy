import React, {Component} from 'react'
import axios from 'axios'
import AddPaperSearchForm from './AddPaperSearchForm'
import AddPaperSearchDisplay from './AddPaperSearchDisplay'
import {Redirect} from 'react-router-dom'

class AddPaperSearch extends Component {
    state = {
        title: "",
        idlist: [], 
        papersList: [],
        dbUpdated: false
    }

handleSubmitSearch = (author, title) => {
    let url= ""
    if(author){
        url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${author}[Author]`
        console.log("url" + url)
    } else if(title) {
      url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${title}[Title]`
    }
    axios.get(url)
    .then(response => {        
      const idlist = response.data.esearchresult.idlist
      this.setState({idlist})
      this.addPapers()
    })
      .catch(error => console.log(error)
          // this.setState({loading: false})
      )
}

postPapers = (papers) => {
  axios.post("http://localhost:3001/paperSelect", {papers})
  .then(response => console.log("message sent" + response))
  .then(response => this.setState({dbUpdated: true}))
}

addPapers = () => { 
    let listString = this.state.idlist.toString()
    let paperList=[]
    if (this.state.idlist.length) {
        axios.get( `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${listString}`)       
        .then(response => {
              let myObj=response.data.result
              Object.keys(myObj).forEach(key => {
                let paperObj = {}
                if (key !== "uids") {
                let title = myObj[key].title
                let  journal = myObj[key].fulljournalname
                let  volume = myObj[key].volume
                let  pages = myObj[key].pages
                let  pmid = myObj[key].uid
                let  authors = myObj[key].authors
                let  year = myObj[key].pubdate.slice(0,4) 
              let authorList = []
              authors.map((author, idx) => {
                if (idx > 0 && idx < 30){
                authorList.push(" " + author.name)
               } else if (idx === 0) {
                 authorList.push(author.name)
               } else if (idx === 30) {
                authorList.push(" et al.")
               }
              })
              // if (authorList.length > 30) {
              // authorList = authorList.slice(0,29) 
              // authorList.push(", et al.")
              // }
            
              paperObj.title = title;
            paperObj.journal = journal;
            paperObj.authors = authorList.toString();
            paperObj.volume = volume;
            paperObj.pages = pages;
            paperObj.year = year;
            paperObj.pmid = pmid;
            paperObj.type = "primary"  
            paperList.push(paperObj);
            }})       
          })
          .then(result => {
            this.setState({ papersList: paperList})
          })
          .catch(error => 
            this.setState({apiError: true, loading: false})
          )

      };
    } 


render (){
let pageDisplay = ""
if(!this.state.dbUpdated){
if (this.state.papersList.length){
  pageDisplay = 
  <AddPaperSearchDisplay 
  papersList = {this.state.papersList}
  handleSelectPapers = {this.handleSelectPapers}
  postPapers = {this.postPapers}
/>
} else {   
  pageDisplay = 
  <AddPaperSearchForm 
  handleSubmitSearch = {this.handleSubmitSearch}
  />
}
} else {
  {alert("Paper(s) successfully added to database")}
  pageDisplay =
  <Redirect to="/admin/home" /> 
}

return (
pageDisplay
)
}
}
export default AddPaperSearch