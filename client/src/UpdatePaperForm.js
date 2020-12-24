import React, {Component} from 'react'
import axios from 'axios'
import AdminHome from './AdminHome'
import "./addPaperManual.css"

class UpdatePaperForm extends Component {
    state = {
        id: "",
        title: "",
        authors: "",
        journal: "",
        year: "",
        volume: "",
        pages:"",
        pmid: "",
        type: "",
        comments: "",
    }

componentDidMount(){
    this.setState({
        id: this.props.paper._id,
        title: this.props.paper.title,
        authors: this.props.paper.authors,
        journal: this.props.paper.journal,
        year: this.props.paper.year,
        volume: this.props.paper.volume,
        pages: this.props.paper.pages,
        pmid:this.props.paper.pmid,
        type: this.props.paper.type,
        comments: this.props.paper.comments,
        updated: false
    })
}

handleFormSubmit = (e) => {
    e.preventDefault()
    let paper = ""
    
    paper = this.state
    axios.put("http://localhost:3001/updatePaper", {paper})
    .then(response => console.log("updated"))
    .then(this.setState({updated:true}))
    .then(alert("Paper details successfully updated!"))
}    

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

render(){
const {id, title, authors, journal, year, volume, pages,  pmid, comments, type } = this.state
let pageDisplay = ""
if(!this.state.updated) {
pageDisplay = 
<div className="addPaperManualContainer">
    <h1 className="addPaperManualFormHeading">Update or edit your paper</h1>
    <form onSubmit={this.handleFormSubmit} className="addPaperManualForm">
            <input type="hidden" name="id" value={id}/>

            <label htmlFor="title" className="formLabel">Title</label> 
            <input type="text" id="title" name="title" value={title} onChange={this.handleChange} className="manualSearchInput"/>

            <label htmlFor="authors" className="formLabel">Authors</label> 
            <input type="text" id="authors" name="authors" value={authors} onChange={this.handleChange} className="manualSearchInput"/>
            
            <label htmlFor="journal" className="formLabel">Journal</label> 
            <input type="text" id="authors" name="journal" value={journal} onChange={this.handleChange} className="manualSearchInput"/>

            <label htmlFor="year" className="formLabel">Year</label> 
            <input type="number" id="year" name="year" value={year} onChange={this.handleChange} className="manualSearchInput"/>

            <label htmlFor="volume" className="formLabel">Volume</label> 
            <input type="number" id="volume" name="volume" value={volume} className="manualSearchInput" onChange={this.handleChange}/>

            <label htmlFor="pages" className="formLabel">Pages</label> 
            <input type="text" id="pages" name="pages" value={pages} onChange={this.handleChange} className="manualSearchInput"/>
        
            <label htmlFor="PMID" className="formLabel">PMID</label> 
            <input type="text" id="pmid" name="pmid" value={pmid} onChange={this.handleChange} className="manualSearchInput"/>

            <div className="typeDropDown">
                <label htmlFor="type" className="typeLabel" >Type</label> 
                <select id="type" name="type" value={type} onChange={this.handleChange}>
                    <option value="primary" defaultValue >Primary Journal</option>
                    <option value="review">Review Journal</option>
                    <option value="chapter">Book Chapter</option>
                    <option value="letter">Letter</option>
                </select>
            </div>
            <label className="formLabel" htmlFor="comments">Comments</label>
            <textarea name="comments" rows="4" cols="65" onChange={this.handleChange} className="commentTextArea" placeholder="Enter comments about the paper (e.g. joint first/last authors, commentaries, journal cover etc)" value={comments}/>
            
            <input type="submit" value="Submit" className="manualSearchButton"/>
    </form>
</div>
} else {
    pageDisplay = <AdminHome />
}
    return(
<div>    
        {pageDisplay}
</div>
        )
    }
}

export default UpdatePaperForm