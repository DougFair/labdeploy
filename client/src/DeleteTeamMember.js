import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import {Redirect} from "react-router-dom"

class DeleteTeamMember extends Component {

state ={
    team: [],
    deleted: false
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
    let check = window.confirm(`Are you sure you want to delete ${evt.target.value}`)
    if (check) {
        this.state.team.forEach(person => {
            if(person._id === evt.target.value) {
            axios.delete(`http://localhost:3001/deleteTeamMember/${person._id}`)
            .then(response => {
                if(response.data === "deleted"){
                    if (person.teamMemberPhotoPath){
                    axios.post(`http://localhost:3001/teammemberphotodelete/${person.teamMemberPhotoPath.slice(56)}`, {id: this.state._id})
                    .then(this.setState({deleted: true}))
                    } else {
                    this.setState({deleted: true})
                } 
            } 
            }) 
                    }
                })   
            } else {
                return              
                }
            }


render() {
    let pageDisplay = ""
    if (!this.state.team.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No team members to delete - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (!this.state.deleted){
    pageDisplay=
        this.state.team.map(person => 
        <div key={person._id} className="editPerson">
            <input type="checkbox" name="person" onChange={this.handleChange} value={person._id} className="editPersonCheckbox" checked={false}/>    
            <p style={{fontWeight: "bold"}}>{person.teamMemberName}</p>
            <p>{"\u00A0"} - {person.teamMemberPosition}</p>
        </div>
    )
    } else if (this.state.deleted){
    pageDisplay = <Redirect to="/admin/home"/>
    }

      return (
        <div className="editTeamContainer">
            <h2 className="titleHead">Delete a Team Member</h2>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default DeleteTeamMember