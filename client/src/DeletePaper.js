import React, {Component} from 'react'
import axios from 'axios'
import "./addPaperSearchDisplay.css"
import {Redirect} from 'react-router-dom'

class DeletePaper extends Component {
    state = {
        allPapers: [],
        selectedPapers:[],
        deleted: false
    }

componentDidMount (){
    axios.get("http://localhost:3001/updatePaper")
    .then(resp => {
        let sortedPapers = resp.data.sort(function(a, b){return b.year - a.year})
        console.log(sortedPapers)
        this.setState({allPapers: sortedPapers});
      });  
}

handleSubmit = (evt) => {
    evt.preventDefault()
    axios.delete("http://localhost:3001/deletePaper",{ data: {papers: this.state.selectedPapers}})
    .then(response => console.log("deleted"))
    .then(this.setState({deleted:true}))
}

handleForm = (evt) => {
    let selection = evt.target.value
    this.setState({selectedPapers: [...this.state.selectedPapers,selection]}) 
}



render(){ 
let paperDisplay = ""
if(!this.state.deleted){
paperDisplay = this.state.allPapers.map((paper,idx) => {
   return (
    <div key={idx} className="eachPaper">
            <input type="checkbox" name="selection" checked={this.state.selectedPapers.includes(paper._id)} value={paper._id} onChange={this.handleForm} />
            <span className="title"> {paper.title} </span>
            <span className="authors"> {paper.authors} </span>
            <span className="year">( {paper.year} )</span>
            <span className="journal" style={{textTransform:"capitalize"}}> {paper.journal}, </span>
            <span className="volume"> {paper.volume}: </span>
            <span className="pages"> {paper.pages}</span>
            {paper.pmid &&
            <span className="pmid">, PMID: <a href= {`https://www.ncbi.nlm.nih.gov/pubmed/${paper.pmid}`} target="_blank" rel="noopener noreferrer"> {paper.pmid} </a></span>
            }      
   </div>
   )
})
} else {
    alert("Paper(s) successfully deleted from database")
}

    return (
        <div>
        {!this.state.deleted ?   
        <div className="addPaperSearchDisplayContainer">
        <div className="addPaperSearchFormHeading">
            <h1 className="addPaperSearchFormHeadingH1">Delete A Paper</h1>
            <h3>Check the ones that you want to delete from your library then click "Submit"</h3>
        </div> 
                <form onSubmit={this.handleSubmit}>
                {paperDisplay}
                <button type="submit" className="selectButton">Submit</button>
                </form>
        </div>
        :
        <Redirect to="/admin/home" /> 
        }
        </div>

)} 
} 


export default DeletePaper