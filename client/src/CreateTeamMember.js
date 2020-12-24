import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createBlogPost.css"
import axios from 'axios'


class CreateTeamMember extends Component {
    state = {
        teamMemberName: "",
        teamMemberPosition: "",
        teamMemberDescription: "",
        rank: null,
        file: "",
        aspect: "",
        teamMemberPhotoPath: "",
        teamMemberEmail: "",
        teamMemberCreated: false
    }

handleChange = (evt) => {
    if (evt.target.name === "teamMemberPosition"){
    if (evt.target.value === "Lab Head"){
        this.setState({rank: 1}) 
    } else if (evt.target.value === "Research Officer") {
        this.setState({rank: 2}) 
    } else if (evt.target.value === "Postdoctorate") {
        this.setState({rank: 3}) 
    } else if (evt.target.value === "Research Assistant") {
        this.setState({rank: 4}) 
    } else if (evt.target.value === "PhD Student") {
        this.setState({rank: 5})
    } else if (evt.target.value === "Honours Student") {
        this.setState({rank: 6})
    } else {
        this.setState({rank : 7})
    }
    }
    this.setState({[evt.target.name]: evt.target.value})
}

handleSubmit = (evt) => {
    let post = {teamMemberName: this.state.teamMemberName, teamMemberPosition: this.state.teamMemberPosition, teamMemberDescription: this.state.teamMemberDescription, teamMemberPhotoPath: this.state.teamMemberPhotoPath, teamMemberEmail: this.state.teamMemberEmail, rank: this.state.rank, aspect: this.state.aspect}

    axios.post("http://localhost:3001/createTeamMember", {post})
    .then(this.setState({teamMemberCreated: true}))
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
        this.setState({file, aspect})
    }
    img.src = URL.createObjectURL(file)
}


handlePhotoSubmit = (e) => {
    e.preventDefault() 
    let url="http://localhost:3001/teamMemberPhotoCreate"
      
    let file = this.state.file 
  
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      axios.post(url, formData, config)
      .then(response => this.setState({teamMemberPhotoPath: response.data}))
      .then(this.handleSubmit)
}
  

render(){
    let pageDisplay = ""
    if (!this.state.teamMemberCreated){
    pageDisplay = 
    <div className="addBlogPostContainer">

        <div className="addBlogPostHeading">
            <h1>Enter a New Team Member</h1>
        </div> 

        <form onSubmit={this.handlePhotoSubmit} className="addBlogItemForm" encType="multipart/form-data">
    
                <label htmlFor="teamMemberName" className="blogFormLabel">Name</label>
                <input type="text" id="teamMemberName" name="teamMemberName" value={this.state.teamMemberName} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Name"/>
    
                <label htmlFor="teamMemberPosition" className="blogFormLabel">Position</label>
                <select type="text" id="teamMemberPosition" name="teamMemberPosition" onChange={this.handleChange} className="blogPostTitleInput" placeholder="Position">
                    <option hidden value=""> -- select an postion -- </option>
                    <option value="Lab Head">Lab Head</option>
                    <option value="Research Officer">Research Officer</option>
                    <option value="Postdoctorate">Postdoctorate</option>
                    <option value="Research Assistant">Research Assistant</option>
                    <option value="PhD Student">PhD Student</option>
                    <option value="Honours Student">Honours Student</option>
                    <option value="other">Other</option>
                </select>

                {this.state.rank === 7 && 
                <div>
                    <label htmlFor="teamMemberPosition" className="blogFormLabel">Add a Position</label>
                    <input type="text" id="teamMemberPosition" name="teamMemberPosition" onChange={this.handleChange} className="blogPostTitleInput" placeholder="Enter a position for this team member"/>
                </div>
                }                   

                <label htmlFor="teamMemberEmail" className="blogFormLabel">Email</label>
                <input type="email" id="teamMemberEmail" name="teamMemberEmail" value={this.state.teamMemberEmail}onChange={this.handleChange} className="blogPostTitleInput" placeholder="Email address (optional)"/>

                <label className="formLabel" htmlFor="blogPost">Description</label>
                <textarea id="blogPost" name="teamMemberDescription" rows="10" cols="65" onChange={this.handleChange} value={this.state.teamMemberDescription} placeholder="Add a description for this team member" className="blogTextArea"/>

                <div className="uploadForm">
                    <label htmlFor="photoUpload">Upload a photo for this blog</label>
                    <input type="file" id="photoUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
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
       <div style={{marginTop:"100px"}}>
       {pageDisplay} 
       </div> 
    )
    }
}
export default CreateTeamMember