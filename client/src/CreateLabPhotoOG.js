import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createBlogPost.css"
import axios from 'axios'

class CreateLabPhoto extends Component {
    state = {
        picEvent: "",
        picCaption: "",
        picPhotoPath: "",
        picYear: "",
        file: "",
        picCreated: false,
        noFileError: false
    }

handleChange = (evt) => {
      this.setState({[evt.target.name]: evt.target.value})
}

handleSubmit = () => {
    let pic = {picEvent: this.state.picEvent, picCaption: this.state.picCaption, picYear: this.state.picYear,picPhotoPath: this.state.picPhotoPath}

    axios.post("http://localhost:3001/createPic", {pic})
    .then(this.setState({picCreated: true}))
}

handlePhotoChange = (evt) => {
    this.setState({file:evt.target.files[0], type:evt.target.name, noFileError:false})
}


handlePhotoSubmit = (evt) => {
    evt.preventDefault() 
    if (!this.state.file) {
       this.setState({noFileError: true}) 
    } else {
    let url="http://localhost:3001/labPhotoCreate"
    
    let file = this.state.file 

    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(url, formData, config)
    .then(response => this.setState({picPhotoPath: response.data}))
    .then(this.handleSubmit)
    }
}
  
render(){
    let pageDisplay = ""
    if (!this.state.picCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <div className="addBlogPostHeading">
            <h1>Enter a New Lab Photo</h1>
        </div> 

        <div style={{color:"indianred", textAlign: "center"}}>
            {this.state.noFileError && <h2>You must select a file to upload before submitting</h2>}
        </div>
        <form onSubmit={this.handlePhotoSubmit} className="addBlogItemForm" encType="multipart/form-data">
    
                <label htmlFor="picEvent" className="blogFormLabel">Event</label>
                <input type="text" id="picEvent" name="picEvent" value={this.state.picEvent} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Enter the event associated with this event"/>
    
                <label htmlFor="picCaption" className="blogFormLabel">Caption</label>
                <input type="text" id="picCaption" name="picCaption" onChange={this.handleChange} value={this.state.picCaption} className="blogPostTitleInput" placeholder="Provide a caption for the photo"/>
                
                <label htmlFor="picYear" className="blogFormLabel">Year</label>
                <input type="text" id="picYear" name="picYear" value={this.state.picYear} onChange={this.handleChange} className="blogPostTitleInput" placeholder="What year was the photo taken?"/>


                <div className="uploadForm">
                    <label htmlFor="documentUpload">Upload your lab photo</label>
                    <input type="file" id="documentUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
                </div>

                <input className="blogPostAddButton" type="submit" value="Submit"/>
    </form>
    </div>
    } else {
        pageDisplay = <Redirect 
        to="/admin/home" 
        />
    }

    return(
       <div>
       {pageDisplay} 
       </div> 
    )
}
}
export default CreateLabPhoto