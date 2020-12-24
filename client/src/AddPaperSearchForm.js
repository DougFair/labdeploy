import React, {Component} from 'react'
import "./addPaperSearchForm.css"

class AddPaperSearchForm extends Component {
    
    state = {
        author: "",
        title: ""
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

     handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmitSearch(this.state.author, this.state.title)
        this.setState({author:"", title:""})
     }

    
    render(){
    return (
    <div className="addPaperSearchFormContainer">
        <h1 className="addPaperSearchFormHeading">Search For Papers To Add To Your Page</h1>
        <h3 className="addPaperSearchFormHeading">Find and add papers either by searching for an author or by title...</h3>


    <div className="addPaperSearchForm">
        <h3 className="addPaperSearchFormLabel">Enter an author name as you would in Pubmed (e.g. Smith AB). </h3>
        <form className="findPapersForm" onSubmit={this.handleSubmit}>
            <input type="text" name="author" className="searchInput" placeholder="Author" onChange={this.handleChange} value={this.state.author}/>
        <button className="searchButton">SEARCH</button>
        </form>
    </div>

    <div className="addPaperSearchForm">
        <h3 className="addPaperSearchFormLabel">Alternatively, enter the title of the article you want to add:</h3>
        <form className="findPapersForm" onSubmit={this.handleSubmit}>
            <input type="text" name="title" className="searchInput" 
            placeholder="Title" onChange={this.handleChange} value={this.state.title}/>
            <button className="searchButton">SEARCH</button>
        </form>
    </div>
</div>
)}
}

export default AddPaperSearchForm