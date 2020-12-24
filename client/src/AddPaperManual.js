import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "./addPaperManual.css"

class AddPaperManual extends Component {

    state = {
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

    handleFormSubmit = (e) => {
        e.preventDefault()
        let paper = ""
        
        paper = this.state
        axios.post("http://localhost:3001/addPaperManual", {paper})
        .then(response => console.log("paper added"))
        .then(this.setState({updated:true}))
    }    
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    render(){
        const {id, title, authors, journal, year, volume, pages, pmid, comments, type } = this.state
        let pageDisplay = ""
        if(!this.state.updated) {
        pageDisplay = 
        <div className="addPaperManualContainer">

            <div className="addPaperManualFormHeading">
                <h1>Manually enter details of an article</h1>
            </div> 
   
            <form onSubmit={this.handleFormSubmit} className="addPaperManualForm">
                    <input type="hidden" name="id" value={id} className="manualSearchInput"/>
        
                    <label htmlFor="title" className="formLabel">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={this.handleChange} className="manualSearchInput" placeholder="Article title"/>
        
                    <label className="formLabel" htmlFor="authors">Authors</label> 
                    <input type="text" id="authors" name="authors" value={authors} onChange={this.handleChange} className="manualSearchInput" placeholder="Authors (e.g. Smith AB, Jones CD,...)"/>
                    
                    <label className="formLabel" htmlFor="journal">Journal</label> 
                    <input type="text" id="authors" name="journal" value={journal} onChange={this.handleChange} className="manualSearchInput" placeholder="Journal title"/>
        
                    <label className="formLabel" htmlFor="year">Year</label> 
                    <input type="number" id="year" name="year" value={year} onChange={this.handleChange} className="manualSearchInput" placeholder="Year published"/>
        
                    <label className="formLabel" htmlFor="volume">Volume</label> 
                    <input type="number" id="volume" name="volume" value={volume} onChange={this.handleChange} className="manualSearchInput" placeholder="Journal volume"/>
        
                    <label className="formLabel" htmlFor="pages">Pages</label> 
                    <input type="text" id="pages" name="pages" value={pages} onChange={this.handleChange} className="manualSearchInput" placeholder="Journal pages (e.g 23-43)"/>
                   
                    <label className="formLabel" htmlFor="PMID">PMID</label> 
                    <input type="text" id="pmid" name="pmid" value={pmid} onChange={this.handleChange} className="manualSearchInput" placeholder="Article PubMed id"/>
        
                    <div className="typeDropDown">
                        <label className="typeLabel" htmlFor="type">Type of article:</label>
                        <select id="type" name="type" value={type} onChange={this.handleChange} >
                            <option value="primary" defaultValue>Primary Journal</option>
                            <option value="review">Review Article</option>
                            <option value="book">Book</option>
                            <option value="chapter">Book Chapter</option>
                            <option value="letter">Letter</option>
                            <option value="commentary">Commentary</option>
                            <option value="editorial">Editorial</option>
                            <option value="magazine">Magazine Article</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <label className="formLabel" htmlFor="comments">Comments</label>
                    <textarea id="comments" name="comments" rows="4" cols="65" onChange={this.handleChange} placeholder="Enter comments about the paper (e.g. joint first/last authors, commentaries, journal cover etc)" className="commentTextArea" value={comments}/>
                    
                    <input className="manualSearchButton" type="submit" value="Submit"/>
            </form>
        </div>
        } else {
            alert("Paper added to database successfully!")
            pageDisplay =
            <Redirect to="/admin/home" /> 
        }     
            return(
        <div>              
            {pageDisplay}
        </div>
        )      
    }
}

export default AddPaperManual