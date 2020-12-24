import React, {Component} from 'react'
import axios from 'axios'
import UpdatePaperForm from './UpdatePaperForm'
import "./addPaperSearchDisplay.css"

class UpdatePaper extends Component {
    state = {
        allPapers: [],
        selectedPaper:""
    }

componentDidMount (){
    axios.get("http://localhost:3001/updatePaper")
    .then(resp => {
        let sortedPapers = resp.data.sort(function(a, b){return b.year - a.year})
        console.log(sortedPapers)
        this.setState({allPapers: sortedPapers});
      });  
}


handleForm = (evt) => {
    evt.preventDefault()
    let selection = evt.target.value
    this.state.allPapers.map(paper => paper.title === selection && this.setState({selectedPaper: paper}))
}


render(){ 
let paperDisplay = ""
if(!this.state.selectedPaper){
paperDisplay = this.state.allPapers.map((paper,idx) => {
   return (
    <div key={idx} className="eachPaper">
        <input type="checkbox" name="selection" checked={this.state.selectedPaper} value={paper.title} onChange={this.handleForm}/>
        <span className="title"> {paper.title} </span>
        <span className="authors"> {paper.authors} </span>
        <span className="year">({paper.year})</span>
        <span className="journal" style={{textTransform:"capitalize"}}> {paper.journal}, </span>
        <span className="volume"> {paper.volume}: </span>
        <span className="pages"> {paper.pages}</span>
        {paper.pmid && 
        <span className="pmid">, PMID: <a href= {`https://www.ncbi.nlm.nih.gov/pubmed/${paper.pmid}`} target="_blank" rel="noopener noreferrer"> {paper.pmid} </a></span>
}       
    </div>
   )
})
} 

    return (
        <div>
        {!this.state.selectedPaper ?   
        <div className="addPaperSearchDisplayContainer">
        <div className="addPaperSearchFormHeading">
            <h1 className="addPaperSearchFormHeadingH1">Edit or Update a Paper</h1>
            <h3>Check the paper that you want to edit or update</h3>
        </div> 
        {paperDisplay}
        </div>
        :
        <UpdatePaperForm 
        paper={this.state.selectedPaper}
        />
        }
        </div>

)} 
} 


export default UpdatePaper