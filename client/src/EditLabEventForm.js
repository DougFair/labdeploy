import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import LinkButton from './LinkButton'
import EditLabPhotoForm from './EditLabPhotoForm'
import AddEventPhotoForm from './AddEventPhotoForm'


class EditLabEventForm extends Component {
    state = {
        _id: "",
        picEvent: "",
        picYear: "",
        pics: [],
        selectedPic: "",
        addEventPhoto: false
    }

componentDidMount (){
    console.log("event" + JSON.stringify(this.props.selectedEvent[0]))
    const {_id, picEvent, picYear, pics} = this.props.selectedEvent[0]
    this.setState({_id, picEvent, picYear, pics})
}

handleChange = (evt) => {
    this.setState({selectedPic: evt.target.value})
}

addEventPhoto = () => {
    this.setState({addEventPhoto:true})
}

// handleChange = (evt) => {
//         this.setState({[evt.target.name]: evt.target.value})
// }   

// handleSubmit = (evt) => {
//     if (evt) evt.preventDefault()  
//     let pic = {id: this.state._id, picEvent: this.state.picEvent, picCaption: this.state.picCaption, picYear: this.state.picYear,picPhotoPath: this.state.picPhotoPath}
//     axios.put("http://localhost:3001/editPic", {pic})
//     .then(response => this.setState({edited: true})
// )}
    

// deletePhotoNow = (path) => {
//     axios.post(`http://localhost:3001/labphotodelete/${path.slice(56)}`, {id: this.state._id})
//     .then(response => response.data)
//     .then(this.handleSubmit())
// }

// newPhotoAdd = (path) => {
//     let oldPath = ""
//     if(this.state.picPhotoPath) {
//         oldPath = this.state.picPhotoPath
//     }
//     this.setState({picPhotoPath: path}, () => {
//         if(oldPath) {
//         this.deletePhotoNow(oldPath)
//          } else {this.handleSubmit()}
//     })    
// }

// handlePhotoChange = (evt) => {
//     this.setState({file:evt.target.files[0]})
// }


// handlePhotoSubmit = (e) => {
//     e.preventDefault() 
//     let url="http://localhost:3001/labPhotoCreate"
      
//     let file = this.state.file 
  
//     const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//       axios.post(url, formData, config)
//       .then(response => this.newPhotoAdd(response.data))
// }



render() {
    let pageDisplay = ""
    if(!this.state.selectedPic && !this.state.addEventPhoto){
        {console.log("heekhlqkw")}
    pageDisplay = 
  
    <div>
    <h1>{this.state.picEvent} - {this.state.picYear}</h1>
    <h2>Add another photo to this event</h2>
    
    <button type="submit" className="addPhotoButton" onClick={this.addEventPhoto}>Add Event Photo</button>


      
            <h2>Otherwise - edit an existing photo within the event</h2>
  
            {this.state.pics.map(pic => 
            <div key={pic._id} className="editPerson">
                <input type="checkbox" name="project" onChange={this.handleChange} value={pic.picPhotoPath} className="editPersonCheckbox" checked={false}/>    
                <p style={{fontWeight: "bold"}}>{pic.picCaption}</p>
                
            </div>
    )}
    </div>
    } else if (this.state.selectedPic){
        pageDisplay = 
        <EditLabPhotoForm 
        selectedPic= {this.state.selectedPic}
        id = {this.state._id}
        pics = {this.state.pics}
        />
    } else if (this.state.addEventPhoto){
        pageDisplay = 
        <AddEventPhotoForm 
        id = {this.state._id}
        pics = {this.state.pics}
        />
    }

      return (
        <div className="editTeamContainer">
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}

export default EditLabEventForm