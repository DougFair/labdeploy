import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import EditTeamMemberForm from "./EditTeamMemberForm"

class EditTeamMembers extends Component {

state ={
    team: [],
    selectedTeamMember: ""
    }

componentDidMount (){
    console.log("mount")
    axios.get("http://localhost:3001/teamMembers")
    .then(response => {
    let sortedResponse = response.data.sort(function(a, b){return a.rank - b.rank})
    this.setState({team: sortedResponse}) 
    })
}

handleChange = (evt) => {
    let selectedTeamMember = this.state.team.filter(person => person.teamMemberName === evt.target.value)
    this.setState({selectedTeamMember})
}


render() {
    let pageDisplay = ""
    if (!this.state.team.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No team members to update - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.team.length && !this.state.selectedTeamMember){
    pageDisplay=
        this.state.team.map(person => 
        <div key={person._id} className="editPerson">
            <input type="checkbox" name="person" onChange={this.handleChange} value={person.teamMemberName} className="editPersonCheckbox"/>    
            <p style={{fontWeight: "bold"}}>{person.teamMemberName}</p>
            <p>{"\u00A0"} - {person.teamMemberPosition}</p>
        </div>
    )
    } else if (this.state.selectedTeamMember){
        pageDisplay = 
        <EditTeamMemberForm 
        selectedTeamMember = {this.state.selectedTeamMember[0]}
        />
    }

      return (
        <div className="editTeamContainer">
            <h1 className="titleHead">Edit a Team Member</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default EditTeamMembers