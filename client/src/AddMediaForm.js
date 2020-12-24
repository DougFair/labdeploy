import React, {Component} from 'react'
import PhotoAddForm from './PhotoAddForm'
import PDFAddForm from './PDFAddForm'
import "./addMedia.css"
import {Redirect} from 'react-router-dom'

class AddMediaForm extends Component {

state ={
        uploaded: false,
        pdfPath: "",
        photoPath: ""
      }

componentDidMount (){
    this.setState({pdfPath: this.props.paper.pdfPath, photoPath: this.props.paper.photoPath})
}


handleUpload = () => {
    this.setState({uploaded: true})
}


render() {
    let pageDisplay=""
    if (this.state.uploaded){
        pageDisplay =
        <Redirect to="/admin/home" /> 
    } else if(this.state.pdfPath && this.state.photoPath){
        pageDisplay =
        <div className="errorDisplay">
            <h3 className="mediaAddedWarning">This paper already has both a PDF and Image associated with it.</h3>
            <p>If you want to add a new PDF or Image - return to the Admin Page and and delete the file first.</p>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>

    } else if (this.state.pdfPath && !this.state.photoPath) {
        pageDisplay =
        <div className="errorDisplay">
            <h3 className="mediaAddedWarning">This paper already has both a PDF file associated with it.</h3>
            <p>If you want to add a new PDF - simply return to the Admin Page and and delete the current file first.</p>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
            <h3 className="altMediaOption">Otherwise you can add a Image</h3>
                <PhotoAddForm 
                    paper={this.props.paper}
                    handleUpload={this.handleUpload}
                />
        </div>
    } else if (!this.state.pdfPath && this.state.photoPath) {
        pageDisplay =
        <div className="errorDisplay">
            <h3 className="mediaAddedWarning">This paper already has both a Image file associated with it.</h3>
            <p>If you want to add a new Image - simply return to the Admin Page and and delete the current file first.</p>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
            <h3 className="altMediaOption">Otherwise you can add a PDF</h3>
                <PDFAddForm 
                    paper={this.props.paper}
                    handleUpload={this.handleUpload}
                />
        </div>
    } else if(!this.state.pdfPath && !this.state.photoPath && !this.state.uploaded){
    
    pageDisplay = 
    <div>
        <h2 className="addMediaFormHeading">Add either a PDF or image to this paper </h2>  
        <h3 className="addMediaFormsubHeading">Add a PDF</h3>
        <PDFAddForm
        paper={this.props.paper}
        handleUpload={this.handleUpload}
        />
        
        <hr/>

        <h3 className="addMediaFormsubHeading">Add a Photo</h3>    
        <PhotoAddForm
        paper={this.props.paper}
        handleUpload={this.handleUpload}
        />
    </div>
    }
      return (
        <div className="addMediaContainer">
        <h2 className="titleLabel">{this.props.paper.title}</h2>
            {pageDisplay}
        </div> 
     )
    }
}
export default AddMediaForm