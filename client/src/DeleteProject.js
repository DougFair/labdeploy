import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import {Redirect} from "react-router-dom"

class DeleteProject extends Component {

state ={
    projects: [],
    deleted: false
    }

componentDidMount (){
    console.log("mount")
    axios.get("http://localhost:3001/projects")
    .then(response => this.setState({projects: response.data}))
}

handleChange = (evt) => {
    let check = window.confirm(`Are you sure you want to delete ${evt.target.value}`)
    if (check) {
        this.state.projects.forEach(project => {
            if(project.projectTitle === evt.target.value) {
            axios.delete(`http://localhost:3001/deleteProject/${project._id}`)
            .then(response => {
                if(response.data === "deleted"){
                    if (project.projectPhotoPath){
                    axios.post(`http://localhost:3001/projectphotodelete/${project.projectPhotoPath.slice(56)}`)
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
    if (!this.state.projects.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No projects to delete - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.projects.length && !this.state.deleted){
    pageDisplay=
        this.state.projects.map(project => 
        <div key={project._id} className="editPerson">
            <input type="checkbox" name="project" onChange={this.handleChange} value={project.projectTitle} className="editPersonCheckbox" checked={false}/>    
            <p style={{fontWeight: "bold"}}>{project.projectTitle}</p>
        </div>
    )
    } else if (this.state.deleted){
    pageDisplay = <Redirect to="/admin/home"/>
    }

    return (
        <div className="editTeamContainer">
            <h2 className="titleHead">Delete a Project</h2>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default DeleteProject