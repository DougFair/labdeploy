import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createBlogPost.css"
import axios from 'axios'

class UpdateBlogPostForm extends Component {
    state = {
        blogTitle: "",
        blogText: "",
        blogPhotoPath:"",
        blogLink: "",
        id: "",
        updated: false
    }

componentDidMount () {
    this.setState({id: this.props.selectedPost._id, blogTitle: this.props.selectedPost.blogTitle, blogText: this.props.selectedPost.blogText, blogPhotoPath: this.props.selectedPost.blogPhotoPath, blogLink: this.props.selectedPost.blogLink})
}


handleSubmit = (evt) => {
    if (evt) {
        evt.preventDefault()
    }
    let post = {blogTitle: this.state.blogTitle, blogText: this.state.blogText, id: this.state.id, blogPhotoPath: this.state.blogPhotoPath, blogLink: this.state.blogLink}
    axios.put("http://localhost:3001/updateBlogPost", {post})
    .then(this.setState({updated: true}))
}

handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})
}


deletePhotoNow = (path) => {
    console.log("oldpath")
    axios.post(`http://localhost:3001/blogphotodelete/${path.slice(56)}`, {id: this.state._id})
    .then(response => response.data)
    .then(this.handleSubmit())
}

newPhotoAdd = (path) => {
let oldPath = ""
if(this.state.blogPhotoPath) {
    oldPath = this.state.blogPhotoPath
}
this.setState({blogPhotoPath: path}, () => {
    if(oldPath) {
    this.deletePhotoNow(oldPath)
     } else {this.handleSubmit()}
})    
}

handlePhotoChange = (evt) => {
this.setState({file:evt.target.files[0]})
}


handlePhotoSubmit = (e) => {
e.preventDefault() 
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
  .then(response => this.newPhotoAdd(response.data))
}


render(){
    let pageDisplay = ""
    if (!this.state.updated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <form onSubmit={this.state.file ? this.handlePhotoSubmit : this.handleSubmit} className="teamMemberForm" encType="multipart/form-data" className="addBlogItemForm">
    
                <label htmlFor="blogItemTitle" className="blogFormLabel">Title</label>
                <input type="text" id="blogItemTitle" name="blogTitle" value={this.state.blogTitle} onChange={this.handleChange} className="blogPostTitleInput"/>
    

                <label className="formLabel" htmlFor="blogPost">Blog Post</label>
                <textarea id="blogPost" name="blogText" rows="20" cols="65" onChange={this.handleChange} value={this.state.blogText} className="blogTextArea"/>
                
                <div className="uploadForm">
                    {this.state.blogPhotoPath ? <label htmlFor="photoUpload">Replace the photo for this blog post</label> : <label htmlFor="photoUpload">Upload a photo for this blog post</label>}
                    <input type="file" id="photoUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
                </div>

                <div className="blogLinkForm">
                    <label className="linkFormLabel" htmlFor="blogLink">Add a link</label>
                    <input type="text" id="blogLink" className="linkInputForm" name="blogLink" onChange={this.handleChange} value={this.state.blogLink}placeholder="Enter URL of link"/>
                </div>

                <input className="blogPostAddButton" type="submit" value="Submit"/>
        </form>
    
    </div>
    } else {
        pageDisplay =
        <Redirect to="/admin/home" />
    }

    return(
       pageDisplay
    )
}



}
export default UpdateBlogPostForm 