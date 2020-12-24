import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class DeleteLabEventForm extends Component {
    state = {
        selectedEvent: {},
        selectedPic: "",
        edited: false
    }

componentDidMount (){
        this.setState({selectedEvent: this.props.selectedEvent})
    }


handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
}   

handleSubmit = (newPics) => {
    const id = this.state.selectedEvent._id
    axios.put(`http://localhost:3001/editPic/${id}`, {pics:newPics})
    .then(response => this.setState({edited: true})
)
}


deletePhotoNow = (evt) => {
    let check = window.confirm(`Are you sure you want to delete the photo: "${evt.target.name}"`)
    if (check) {
    let path = evt.target.value
    let picsRemovedPic = this.state.selectedEvent.pics.filter(pic => pic.picPhotoPath !== path)
    axios.post(`http://localhost:3001/labphotodelete/${path.slice(56)}`, {id: this.state._id})
    .then(response => response.data)
    .then(this.handleSubmit(picsRemovedPic))
    } else {
        return
    }
}

deleteEvent = () => {
    const id = this.state.selectedEvent._id
    axios.delete(`http://localhost:3001/deleteEvent/${id}`)
    .then(response => this.setState({edited: true})
)
}

handleDeleteEventPhotos = () => {
        let pics = this.state.selectedEvent.pics
        let check = window.confirm(`Are you sure you want to delete the entire event: "${this.state.selectedEvent.picEvent}"`)
        if (check){
        if(pics.length < 2) {
            console.log("single")
            axios.post(`http://localhost:3001/labphotodelete/${pics[0].picPhotoPath.slice(56)}`, {id: this.state.selectedEvent._id})
            .then(this.deleteEvent())
        } else if (pics.length > 1){
            console.log("mutii")
            let photoArray = []
            pics.forEach(pic => {
                photoArray.push({Key: pic.picPhotoPath.slice(56)})
            })
            console.log("pA" + photoArray)
            axios.post(`http://localhost:3001/labmultiphotodelete/${this.state.selectedEvent._id}`, {photoArray: photoArray})
            .then(this.deleteEvent())
        }
    }
     else {
        return
    }  

    }

render() {
    let pageDisplay = ""
    if (!this.state.edited){
    if(this.state.selectedEvent) {
    pageDisplay = 
    <div>
        <h2>Event: {this.props.selectedEvent.picEvent}</h2>
        <h2>Do you want to delete all the entire event including all photos?</h2>
        <button type="submit" onClick={this.handleDeleteEventPhotos}>DELETE EVENT</button>
    
    
    <div>
    <h2>Otherwise - delete a single photo within the event</h2>
  
        {this.props.selectedEvent.pics.map(pic => 
        <div key={pic.picPhotoPath} className="editPerson">
            <input type="checkbox" name={pic.picCaption} onChange={this.deletePhotoNow} value={pic.picPhotoPath} className="editPersonCheckbox" checked={false}/>    
            <p style={{fontWeight: "bold"}}>{pic.picCaption}</p>
            
        </div>
        )}
    </div>

    </div>
    }
    } else {
       pageDisplay = <Redirect to="/admin/home" />
    }

      return (
        <div>
            {pageDisplay}
        </div> 
     )
    }
}
export default DeleteLabEventForm