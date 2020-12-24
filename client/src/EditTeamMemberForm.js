import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class EditTeamMemberForm extends Component {
    state = {
        _id: "",
        teamMemberName: "",
        teamMemberPosition: "",
        teamMemberDescription: "",
        rank: null,
        file: "",
        aspect: "",
        teamMemberPhotoPath: "",
        teamMemberEmail: "",
        edited: false,
        newPhotoPath: "",
    }

componentDidMount (){
    const {_id, teamMemberName, teamMemberPosition, teamMemberDescription, teamMemberEmail, teamMemberPhotoPath, rank, aspect} = this.props.selectedTeamMember
    this.setState({_id, teamMemberName, teamMemberPosition, teamMemberDescription, teamMemberEmail, teamMemberPhotoPath, rank, aspect})
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
        if (evt) evt.preventDefault()  
        let post = {id: this.state._id, teamMemberName: this.state.teamMemberName, teamMemberPosition: this.state.teamMemberPosition, teamMemberDescription: this.state.teamMemberDescription, teamMemberPhotoPath: this.state.teamMemberPhotoPath, teamMemberEmail: this.state.teamMemberEmail, rank: this.state.rank, aspect: this.state.aspect}
    
        axios.put("http://localhost:3001/editTeamMember", {post})
        .then(response => this.setState({edited: true})
        )}
    

deletePhotoNow = (path) => {
        axios.post(`http://localhost:3001/teammemberphotodelete/${path.slice(56)}`, {id: this.state._id})
        .then(response => response.data)
        .then(this.handleSubmit())
}

newPhotoAdd = (path) => {
    let oldPath = ""
    if(this.state.teamMemberPhotoPath) {
        oldPath = this.state.teamMemberPhotoPath
    }
    this.setState({newPhotoPath: path, teamMemberPhotoPath: path}, () => {
        if(oldPath) {
        this.deletePhotoNow(oldPath)
         } else {this.handleSubmit()}
    })    
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
      .then(response => this.newPhotoAdd(response.data))
}



render() {
    let pageDisplay = ""
    if (!this.state.edited){
    pageDisplay = 
    <div>
        <form onSubmit={this.state.file ? this.handlePhotoSubmit : this.handleSubmit} className="teamMemberForm" encType="multipart/form-data">
    
            <label htmlFor="teamMemberName" className="teamMemberFormLabel">Name</label>
            <input type="text" id="teamMemberName" name="teamMemberName" value={this.state.teamMemberName} onChange={this.handleChange} className="teamMemberInput" placeholder="Name"/>

            <label htmlFor="teamMemberPosition" className="teamMemberFormLabel">Position</label>
            <select type="text" id="teamMemberPosition" name="teamMemberPosition" onChange={this.handleChange} className="teamMemberInput" placeholder="Position" value={this.state.teamMemberPosition || ""}>
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
                    <input type="text" id="teamMemberPosition" name="teamMemberPosition" onChange={this.handleChange} value={this.state.teamMemberPosition} className="blogPostTitleInput" placeholder="Enter a position for this team member"/>
                </div>
            }   

            <label htmlFor="teamMemberEmail" className="teamMemberFormLabel">Email</label>
            <input type="email" id="teamMemberEmail" name="teamMemberEmail" value={this.state.teamMemberEmail || ""} onChange={this.handleChange} className="teamMemberInput" placeholder="Email address (optional)"/>

            <label className="teamMemberFormLabel" htmlFor="blogPost">Description</label>
            <textarea id="blogPost" name="teamMemberDescription" rows="10" cols="65" onChange={this.handleChange} value={this.state.teamMemberDescription} placeholder="Add a description for this team member" className="teamMemberTextArea"/>

            <div className="uploadForm">
                    {this.state.teamMemberPhotoPath ? <label htmlFor="photoUpload">Replace the photo for this team member</label> : <label htmlFor="photoUpload">Upload a photo for this team member</label>}
                    <input type="file" id="photoUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
            </div>

            <input className="blogPostAddButton" type="submit" value="Submit"/>
        </form>
    </div>
    } else {
       pageDisplay = <Redirect to="/admin/home" />
    }

      return (
        <div className="editTeamContainer">
            {pageDisplay}
        </div> 
     )
}}

export default EditTeamMemberForm