import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class EditLabPhotoForm extends Component {
    state = {
        id: "",
        pics: [],
        selectedPic: "",
        picCaption: "",
        picPhotoPath: "",
        aspect: "",
        file: "",
        edited: false,
    }

componentDidMount (){
    const {id, pics, selectedPic} = this.props
    pics.forEach(pic => {
        if(pic.picPhotoPath === selectedPic){
            this.setState({id, pics, picCaption: pic.picCaption, aspect: pic.aspect, picPhotoPath: selectedPic})
        }
    })
}

handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
}   

handleSubmit = (evt) => {
console.log("oldie")
    if (evt) evt.preventDefault()  
    let pic = {picCaption: this.state.picCaption, picPhotoPath: this.state.picPhotoPath, aspect: this.state.aspect}
    const allPics = this.state.pics
    let picsAddedPic = [...allPics, pic]
    const id = this.state.id

    axios.put(`http://localhost:3001/editPic/${id}`, {pics:picsAddedPic})
    .then(response => this.setState({edited: true})
)}

handleNoPhotoSubmit = (evt) => {

    if (evt) evt.preventDefault() 
    let oldPath = this.state.picPhotoPath
    let picsRemovedPic = this.state.pics.filter(pic => pic.picPhotoPath !== oldPath) 
    let pic = {picCaption: this.state.picCaption, picPhotoPath: this.state.picPhotoPath, aspect: this.state.aspect}

    let picsAddedPic = [...picsRemovedPic, pic]
    const id = this.state.id

    axios.put(`http://localhost:3001/editPic/${id}`, {pics:picsAddedPic})
    .then(response => this.setState({edited: true})
)}
    

deletePhotoNow = (path) => {
    axios.post(`http://localhost:3001/labphotodelete/${path.slice(56)}`, {id: this.state._id})
    .then(response => response.data)
    .then(this.handleSubmit())
}

newPhotoAdd = (path) => {
    let oldPath = this.state.picPhotoPath
    let picsRemovedPic = this.state.pics.filter(pic => pic.picPhotoPath !== oldPath)
   
    this.setState({picPhotoPath: path, pics: picsRemovedPic}, () => {
       this.deletePhotoNow(oldPath)

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
      .then(response => this.newPhotoAdd(response.data))
}



render() {
    let pageDisplay = ""
    if (!this.state.edited){
    pageDisplay = 
    <div>
        <form onSubmit={this.state.file ? this.handlePhotoSubmit : this.handleNoPhotoSubmit} encType="multipart/form-data" className="teamMemberForm">


        <label htmlFor="picCaption" className="blogFormLabel">Caption</label>
        <input type="text" id="picCaption" name="picCaption" value={this.state.picCaption}onChange={this.handleChange} className="blogPostTitleInput" placeholder="Edit the caption for this photo"/>
        
 
        <div className="uploadForm">
            <label htmlFor="documentUpload">Upload your new lab photo</label>
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

export default EditLabPhotoForm