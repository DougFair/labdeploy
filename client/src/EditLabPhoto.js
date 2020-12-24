import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import EditLabEventForm from "./EditLabEventForm"

class EditLabPhoto extends Component {

state ={
    events: [],
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
    let selectedEvent = this.state.events.filter(event => event._id === evt.target.value)
    this.setState({selectedEvent})
}


render() {
    let pageDisplay = ""
    if (!this.state.events.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h1 className="titleHeadDoc">Edit a Lab Event / Photos</h1>
            <h3>No events to edit / update - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.events.length && !this.state.selectedEvent){
        pageDisplay=
        this.state.events.map(pic => 
        <div key={pic._id} className="editPerson">
            <input type="checkbox" name="project" onChange={this.handleChange} value={pic._id} className="editPersonCheckbox" checked={false}/>    
            <p style={{fontWeight: "bold"}}>{pic.picEvent}</p>
            <p>{"\u00A0"} - {pic.picYear}</p>
        </div>
    )
    } else if (this.state.selectedEvent){
        pageDisplay = 
        <EditLabEventForm 
        selectedEvent= {this.state.selectedEvent}
        />
    }

      return (
        <div className="editTeamContainer">
            <h1 className="titleHeadDoc">Edit a Lab Photo</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default EditLabPhoto