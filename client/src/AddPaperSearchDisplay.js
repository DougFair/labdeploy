import React, {Component} from 'react'
import "./addPaperSearchDisplay.css"

class AddPaperSearchDisplay extends Component {
    state = {
        allPapers: [],
        selectedPapers:[],
        changeTypePapers: []
    }

componentDidMount (){
    let sortedPapers = this.props.papersList.sort(function(a, b){return b.year - a.year})
    console.log(sortedPapers)
    this.setState({allPapers: sortedPapers});
}


handleForm = (evt) => {
    let filterArray = []
    let title = evt.target.value
    if(this.state.selectedPapers.length) {
        filterArray = this.state.selectedPapers.filter(paper =>  paper.title !== title)
        if (this.state.selectedPapers.length === filterArray.length){
                this.state.allPapers.map(paper => {
                    if(paper.title === title) {
                    this.setState({selectedPapers: [...this.state.selectedPapers,paper]})
                }})} else {
                    this.setState({selectedPapers: filterArray})
                }
            
        } else  {
                this.state.allPapers.map(paper => {
                if(paper.title === title) {
                this.setState({selectedPapers: [...this.state.selectedPapers,paper]})
            }})
        }
    } 

handleTypeChange = (evt) => {
    let id = evt.target.value.slice(0,evt.target.value.indexOf("-"))
    let type = evt.target.value.slice(evt.target.value.indexOf("-")+1,)
    this.state.allPapers.map(paper => {
        if(paper.id === id) {
            paper.type=type
            this.setState({changeTypePapers:[...this.state.changeTypePapers, paper]})
        }
    })
}

handleSubmit = (evt) => {
    evt.preventDefault()
    let updatedSelections = []

    this.state.selectedPapers.forEach(sel => {
            this.state.changeTypePapers.includes(sel)
            ?
            this.state.changeTypePapers.forEach(paper => paper.title === sel.title && updatedSelections.push(paper) )
            :
            updatedSelections.push(sel)
        })
    
        this.props.postPapers(updatedSelections)
}
    


render(){ 
    let paperDisplay = ""

    paperDisplay = this.props.papersList.map((paper, idx) => {
        return (
    <div key={idx} className="eachPaper">
            <input type="checkbox" name="selection" value={paper.title} onChange={this.handleForm}/>
            <span className="title"> {paper.title} </span>
            <span className="authors"> {paper.authors} </span>
            <span className="year">({paper.year})</span>
            <span className="journal" style={{textTransform:"capitalize"}}> {paper.journal}, </span>
            <span className="volume"> {paper.volume}: </span>
            <span className="pages"> {paper.pages}, </span>
            <span className="pmid">PMID: <a href={`https://www.ncbi.nlm.nih.gov/pubmed/${paper.pmid}`} target="_blank" rel="noopener noreferrer"> {paper.pmid} </a></span>
            <span>
                <select onChange={this.handleTypeChange} className="typeSelector">
                    <option  value="Primary Article" select="true">Primary Article</option>
                    <option value={`${paper.id}-Review`}>Review Article</option>
                    <option value={`${paper.id}-Book`}>Book</option>
                    <option value={`${paper.id}-Chapter`}>Book Chapter</option>
                    <option value={`${paper.id}-Letter`}>Letter</option>
                    <option value={`${paper.id}-Commentary`}>Commentary</option>
                    <option value={`${paper.id}-Editorial`}>Editorial</option>
                    <option value={`${paper.id}-Magazine`}>Magazine Article</option>
                    <option value={`${paper.id}-other`}>Other</option>
                </select>
           </span>       
   </div>
   )})

    return (
        <div className="addPaperSearchDisplayContainer">
        <div className="addPaperSearchFormHeading">
            <h1 className="addPaperSearchFormHeadingH1">Search Results</h1>
            <h3>Check the ones that you want to add to your library then click "Submit"</h3>
            <h4 className="headingPara">You can also select the paper type here (or later by going to "Edit/Update papers" in Admin).</h4>
        </div> 
        <form onSubmit={this.handleSubmit}>
        {paperDisplay}
        <button type="submit" className="selectButton">Submit</button>
        </form>
        </div>
)} 
} 

export default AddPaperSearchDisplay