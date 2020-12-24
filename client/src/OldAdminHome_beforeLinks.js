import React, {Component} from 'react'
import "./AdminHome.css"
import LinkButton from './LinkButton'
import "./LinkButton.css"

class AdminHomeForm extends Component {

handleSubmit = (e) => {
    e.preventDefault()
    let mode = e.target.name
    console.log("mode" + mode)
    this.props.handlePaperForm(mode)
}

render(){
return (
    <div className="adminHomeContainer">
        <div className="adminHomeHeading">
            <h1 className="adminHomeHeadingItem">Administrator Home Page</h1>
            <p className="adminHomeHeadingItem">This page directs you to where you can create or edit your library, or add media such as PDFs and photos to your papers.</p>
            <h3>What would you like to do?</h3>
        </div>

        <hr/>

        <h2 className="adminHomeSubHeading">Create a library</h2>
        <p>Add papers by searching PubMed or enter details manually (e.g. for book chapter or articles not indexed by PubMed) </p>
        
        <div className="adminHomeForm">
            <form name="addSearch" onSubmit={this.handleSubmit}>
                <button className="adminButton" type="submit">Add Publication(s) - Search</button>
            </form>

            <form name="addManual" onSubmit={this.handleSubmit}>
                <button className="adminButton" type="submit">Add Publication - Manual</button>
            </form>
        </div>
        <hr/>

        <h2 className="adminHomeSubHeading">Edit your library</h2>
        <p>Editing an article allows you to add details not available through Pubmed such co-first or corresponding authorship, as well as other information such as if it was on the cover of the journal, had a commentary etc. You can also a delete an article from your library.</p>

        <div className="adminHomeForm">
            <form name="update" onSubmit={this.handleSubmit}>
                <button className="adminButton" type="submit">Edit Publication</button>
            </form>

            <form name="delete" onSubmit={this.handleSubmit}>
                <button className="adminButton" type="submit">Delete Publication</button>
            </form>
        </div>

        <hr/>

        <h2 className="adminHomeSubHeading">Add Media</h2>
        <p>You can add a PDF and/or an image to article. This will both enable visitors to your page to access the PDF (if allowed), but will also provide the image used in your publication gallery.</p>
        
        <div className="adminHomeForm">
            <form name="addMedia" onSubmit={this.handleSubmit}>
            <LinkButton className="linkButton" to='/adminhome/addmedia'>Add Media</LinkButton>
            {/* <button className="adminButton" type="submit">Add a PDF or Image to a Publication</button> */}
            </form>

            <form name="deleteMedia" onSubmit={this.handleSubmit}>
            <button className="adminButton" type="submit">Delete a PDF or Image from a Publication</button>
            </form>
        </div>
    </div>
)}
}

export default AdminHomeForm