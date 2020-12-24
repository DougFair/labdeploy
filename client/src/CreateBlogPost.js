import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createBlogPost.css"
import axios from 'axios'

class CreateBlotPost extends Component {
    state = {
        blogPostTitle: "",
        blogPostText: "",
        file: "",
        blogPostLink: "",
        blogPhotoPath: "",
        blogCreated: false
    }

handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})
}

handleSubmit = (evt) => {
    if(evt) {
    evt.preventDefault()
    }

    let post = {blogPostTitle: this.state.blogPostTitle, blogPostText: this.state.blogPostText, blogPhotoPath: this.state.blogPhotoPath, blogPostLink: this.state.blogPostLink }

    axios.post("http://localhost:3001/createBlogPost", {post})
    .then(response => response.data)
    .then(this.setState({blogPostTitle: "", blogPostText: "", blogPhotoPath: "", blogCreated: true, blogPostLink: ""}))
}

handlePhotoChange = (evt) => {
    this.setState({file:evt.target.files[0], type:evt.target.name})
}


handlePhotoSubmit = (evt) => {
    evt.preventDefault() 

    let url="http://localhost:3001/blogPhotoCreate"
      
    let file = this.state.file 
  
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      axios.post(url, formData, config)
      .then(response => this.setState({blogPhotoPath: response.data}))
      .then(this.handleSubmit)
}
  


render(){
    let pageDisplay = ""
    if (!this.state.blogCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">
        
        <h1 className="addBlogPostHeading">Enter a Blog Post</h1>
        
        <form onSubmit={this.state.file ? this.handlePhotoSubmit : this.handleSubmit} className="addBlogItemForm">
    
            <label htmlFor="blogItemTitle" className="blogFormLabel">Title</label>
            <input type="text" id="blogItemTitle" name="blogPostTitle" value={this.state.blogPostTitle} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Blog title"/>

            <div className="blogTextArea">
                <label className="formLabel" htmlFor="blogPost">Blog Post</label>
                <textarea id="blogPost" name="blogPostText" rows="20" cols="65" onChange={this.handleChange} value={this.state.blogPostText} placeholder="Enter your Blog post" className="blogTextArea"/>
            </div>
            
            <div className="uploadForm">
                <label htmlFor="photoUpload">Select a photo to upload for this blog</label>
                <input type="file" id="photoUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
            </div>
            
            <div className="blogLinkForm">
                <label className="linkFormLabel" htmlFor="blogLink">Add a link</label>
                <input type="text" id="blogLink" className="linkInputForm" name="blogPostLink" onChange={this.handleChange} placeholder="Enter URL of link"/>
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
       pageDisplay
    )
}



}
export default CreateBlotPost