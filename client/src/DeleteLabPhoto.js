import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import {Redirect} from "react-router-dom"
import DeleteLabEventForm from './DeleteLabEventForm'

class DeleteLabPhoto extends Component {

state ={
    events: [],
    deleted: false,
    selectedEvent: ""
    }


componentDidMount (){
        axios.get("http://localhost:3001/pics")
        .then(response => {
            let sortedResponse = response.data.sort(function(a, b){return b.picYear - a.picYear})
            this.setState({events: sortedResponse}) 
        })
}

handleChange = (evt) => {
    this.state.events.forEach(event => {
        if(event._id === evt.target.value){
            this.setState({selectedEvent: event})
        }
    })
}


render() {
    let pageDisplay = ""
    if (!this.state.events.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h1 className="titleHeadDoc">Delete  Photos</h1>
            <h3>No events to delete - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.events.length && !this.state.selectedEvent){
        pageDisplay = 
            this.state.events.map(event => 
            <div key={event._id} className="editPerson">
                <input type="checkbox" name="project" onChange={this.handleChange} value={event._id} className="editPersonCheckbox" checked={false}/>    
                <p style={{fontWeight: "bold"}}>{event.picEvent}</p>
                <p>{"\u00A0"} - {event.picYear}</p>
            </div>
            )
       
    } else if (this.state.selectedEvent){
        pageDisplay = 
        <DeleteLabEventForm 
        selectedEvent= {this.state.selectedEvent}
        />
    }

      return (
        <div className="editTeamContainer">
            <h1 className="titleHeadDoc">Delete a Lab Photo</h1>
            {!this.state.selectedEvent && <h2>Select and event from which to delete photos</h2>}
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default DeleteLabPhoto