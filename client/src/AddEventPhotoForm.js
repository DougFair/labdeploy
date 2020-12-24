import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class AddEventPhotoForm extends Component {
    state = {
        id: "",
        pics: [],
        picCaption: "",
        picPhotoPath: "",
        aspect: "",
        file: "",
        edited: false,
    }

componentDidMount (){
    const {id, pics} = this.props
    this.setState({id, pics})
}

handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
}   

handleSubmit = (path) => {

    let pic = {picCaption: this.state.picCaption, picPhotoPath: path, aspect: this.state.aspect}

    let picsAddedPic = [...this.state.pics, pic]
    const id = this.state.id

    axios.put(`http://localhost:3001/editPic/${id}`, {pics:picsAddedPic})
    .then(response => this.setState({edited: true})
)}
    

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
      .then(response => this.handleSubmit(response.data))
}



render() {
    let pageDisplay = ""
    if (!this.state.edited){
    pageDisplay = 
    <div>
        <form onSubmit={this.handlePhotoSubmit} encType="multipart/form-data" className="teamMemberForm">


        <label htmlFor="picCaption" className="blogFormLabel">Caption</label>
        <input type="text" id="picCaption" name="picCaption" value={this.state.picCaption} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Edit the caption for this photo"/>
        
 
        <div className="uploadForm">
            <label htmlFor="documentUpload">Upload your lab photo</label>
            <input type="file" id="documentUpload" className="uploadFileInput" name="photo" onChange={this.handlePhotoChange}/>
        </div>

        <input className="blogPostAddButton" type="submit" value="Submit"/>
        </form>

    </div>
    } else {
       pageDisplay = <Redirect to="/admin/home" />
    }

      return (
        <div>
            {pageDisplay}
        </div> 
     )
}}

export default AddEventPhotoForm