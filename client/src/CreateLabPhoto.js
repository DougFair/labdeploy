import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createBlogPost.css"
import YesNoButtons from "./YesNoButtons"
import axios from 'axios'

class CreateLabPhoto extends Component {
    state = {
        picEvent: "",
        picCaption: "",
        picPhotoPath: "",
        picYear: "",
        file: "",
        aspect:"",
        picCreated: false,
        picAdded: false,
        noFileError: false,
        pics: []
    }

handleChange = (evt) => {
      this.setState({[evt.target.name]: evt.target.value})
}

handleSubmit = () => {
    let pic = {picEvent: this.state.picEvent, picYear: this.state.picYear, pics: this.state.pics}

    axios.post("http://localhost:3001/createPic", {pic})
    .then(this.setState({picCreated: true}))
}

handleAdd = () => {
    let picItem = {picPhotoPath: this.state.picPhotoPath,aspect:this.state.aspect, picCaption: this.state.picCaption}
    console.log("pciItem" + JSON.stringify(picItem))
    this.setState({pics: [...this.state.pics, picItem], file: "", picPhotoPath: "", picCaption: "", picAdded: true, aspect: ""})
}

handleConfirm = (confirm) => {
    if(confirm) {
        this.setState({picAdded: false})
    } else {
        this.handleSubmit()
    }
}


handlePhotoChange = (evt) => {
    let file = evt.target.files[0] 
    let img = new Image()       
    img.onload = () => {
        let height = img.height
        let width = img.width
        let aspect = ""
        if(width > height) {
            aspect = "landscape"
        } else {
            aspect = "portrait"
        } 
    this.setState({file, aspect, noFileError:false})
}
img.src = URL.createObjectURL(file)
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
    .then(response => this.setState({picPhotoPath: response.data}, () => this.handleAdd()))
    }
}
  
render(){
    let pageDisplay = ""
    if (!this.state.picCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <div className="addBlogPostHeading">
            <h1>Enter a Lab Photo</h1>
        </div> 

        <div style={{color:"indianred", textAlign: "center"}}>
            {this.state.noFileError && <h2>You must select a file to upload before submitting</h2>}
        </div>
        <form onSubmit={this.handlePhotoSubmit} className="addBlogItemForm" encType="multipart/form-data">
    
                <label htmlFor="picEvent" className="blogFormLabel">Event</label>
                <input type="text" id="picEvent" name="picEvent" value={this.state.picEvent} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Enter the event associated with the photo"/>
              
                <label htmlFor="picYear" className="blogFormLabel">Year</label>
                <input type="text" id="picYear" name="picYear" value={this.state.picYear} onChange={this.handleChange} className="blogPostTitleInput" placeholder="What year was the photo taken?"/>

                {this.state.picAdded ?
                <YesNoButtons 
                    handleConfirm={this.handleConfirm}
                />
                :
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <div className="uploadForm">
                        <label htmlFor="documentUpload">Upload your lab photo</label>
                        <input type="file" id="documentUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
                    </div>

                    <label htmlFor="picCaption" className="blogFormLabel">Caption</label>
                    <input type="text" id="picCaption" name="picCaption" onChange={this.handleChange} value={this.state.picCaption} className="blogPostTitleInput" placeholder="Add a caption for this photo"/>
                    <input className="blogPostAddButton" type="submit" value="Submit"/>
                </div>
                }

                
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