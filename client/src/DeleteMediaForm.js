import React, {Component} from 'react'
import axios from 'axios'
import "./deleteMedia.css"
import {Redirect} from 'react-router-dom'

class DeleteMediaForm extends Component {

state = {
    mediaType:"",
    fileDeleted: false
}

componentDidMount (){
    if (this.props.paper.pdfPath && this.props.paper.photoPath){
        this.setState({mediaType: "both"})
    } else if (this.props.paper.pdfPath && !this.props.paper.photoPath) {
        this.setState({mediaType: "pdf"})
    } else if (this.props.paper.photoPath && !this.props.paper.pdfPath) {
        this.setState({mediaType: "photo"})
    } else if (!this.props.paper.photoPath && !this.props.paper.pdfPath) {
        this.setState({mediaType: "none"})
    }
}


deletePDF = (evt) => {
    evt.preventDefault()
    axios.post(`http://localhost:3001/pdfdelete/${this.props.paper.pdfPath.slice(56)}`, {id: this.props.paper._id})
    .then (response => {
        if (this.state.mediaType === "both") {
        this.deletePhoto()
        } else {
        this.setState({fileDeleted:true})
    }
    })
}

deletePhoto = () => {
    axios.post(`http://localhost:3001/photodelete/${this.props.paper.photoPath.slice(56)}`, {id: this.props.paper._id})
    .then(response => {
        this.setState({fileDeleted:true})
    })
}


render(){
let pageDisplay = ""
if (!this.state.fileDeleted){
if(this.state.mediaType === "none") {
        pageDisplay = 
    <div className="deleteMediaContainer">
        <h2 className="deleteMediaInstruction"> This paper does not have any media associated with it</h2>
        <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
    </div>
    }
        if (this.state.mediaType === "pdf"){
        pageDisplay =
            <div className="deleteMediaContainer">
            <h3 className="deleteMediaInstruction">Click to delete the PDF file associated with this paper:</h3>
                <form onSubmit={this.deletePDF} className="deleteMediaForm">
                    <input type="submit" value="Delete PDF" className="deleteMediaButton"/>
                </form>
            </div>
    } else if (this.state.mediaType === "photo"){
        pageDisplay =
        <div className="deleteMediaContainer">
        <h3 className="deleteMediaInstruction">Click to delete the photo file associated with this paper:</h3>
            <form onSubmit={ e => {e.preventDefault(); this.deletePhoto()}} className="deleteMediaForm">
                <input type="submit" value="Delete Photo" className="deleteMediaButton"/>
            </form>
        </div>
    } else if (this.state.mediaType === "both"){
        pageDisplay =
        <div className="deleteMediaContainer">
        <h3 className="deleteMediaInstruction">Click to delete just the PDF file associated with this paper:</h3>
            <form onSubmit={this.deletePDF} className="deleteMediaForm">
                <input type="submit" value="Delete PDF" className="deleteMediaButton"/>
            </form>
        <hr/>   
        <h3 className="deleteMediaInstruction">Click to delete just the image file associated with this paper:</h3>
        <form onSubmit={ e => {e.preventDefault(); this.deletePhoto()}} className="deleteMediaForm">
            <input type="submit" value="Delete Photo" className="deleteMediaButton"/>
        </form>
        <hr/> 
        <h3 className="deleteMediaInstruction">Click to delete both the PDF AND the image file associated with this paper:</h3>
        <form onSubmit={this.deletePDF} className="deleteMediaForm">
            <input type="submit" value="Delete PDF & Image" className="deleteMediaButton"/>
        </form>
        </div>
    }
    } else {
    alert("File(s) Deleted!")
    pageDisplay=
    <Redirect to="/admin/home"
    /> 
    }
return(
    <div className="deleteMediaContainer">
        <h2 className="deleteMediaTitle">{this.props.paper.title}</h2>
        {pageDisplay}
    </div>
    )
    }
}
export default DeleteMediaForm