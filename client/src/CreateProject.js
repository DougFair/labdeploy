import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createBlogPost.css"
import axios from 'axios'

class CreateProject extends Component {
    state = {
        projectTitle: "",
        projectDescription: "",
        file: "",
        projectPhotoPath: "",
        projectFunding: "",
        projectCreated: false
    }

handleChange = (evt) => {
     this.setState({[evt.target.name]: evt.target.value})
}

handleSubmit = (evt) => {
    evt && evt.preventDefault()  
    let project = {
        projectTitle: this.state.projectTitle, 
        projectDescription: this.state.projectDescription,
        projectPhotoPath: this.state.projectPhotoPath, 
        projectFunding: this.state.projectFunding, 
    }

    axios.post("http://localhost:3001/createProject", {project})
    .then(response => response.data)
    .then(this.setState({projectCreated: true}))
}

handlePhotoChange = (evt) => {
    this.setState({file:evt.target.files[0], type:evt.target.name})
}


handlePhotoSubmit = (e) => {
    e.preventDefault() 
    let url="http://localhost:3001/projectPhotoCreate"
    
    let file = this.state.file 

    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(url, formData, config)
    .then(response => this.setState({projectPhotoPath: response.data}))
    .then(this.handleSubmit)
}
  
  


render(){
    let pageDisplay = ""
    if (!this.state.projectCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <div className="addBlogPostHeading">
            <h1>Enter a Project</h1>
        </div> 

        <form onSubmit={this.state.file ? this.handlePhotoSubmit : this.handleSubmit} className="addBlogItemForm" encType="multipart/form-data">
    
                <label htmlFor="projectTitle" className="blogFormLabel">Project Title</label>
                <input type="text" id="projectTitle" name="projectTitle" value={this.state.projectTitle} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Project Title"/>
    
                <label className="formLabel" htmlFor="projectDescription">Project Description</label>
                <textarea id="projectDescription" name="projectDescription" rows="20" cols="65" onChange={this.handleChange} value={this.state.projectDescription} placeholder="Add a description of this project" className="blogTextArea" style={{marginBottom: "20px"}}/>

                <label htmlFor="projectFunding" className="blogFormLabel">Project Funding</label>
                <input type="text" id="projectFunding" name="projectFunding" value={this.state.projectFunding} onChange={this.handleChange} className="blogPostTitleInput" placeholder="List funding sources"/>

                <div className="uploadForm">
                    <label htmlFor="documentUpload">Upload a photo for this project</label>
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
export default CreateProject