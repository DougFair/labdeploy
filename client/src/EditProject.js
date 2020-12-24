import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import EditProjectForm from "./EditProjectForm"

class EditProject extends Component {

state ={
    projects: [],
    selectedProject: ""
    }

componentDidMount (){
    console.log("mount")
    axios.get("http://localhost:3001/projects")
    .then(response => this.setState({projects: response.data}))
}

handleChange = (evt) => {
    let selectedProject = this.state.projects.filter(project => project.projectTitle === evt.target.value)
    this.setState({selectedProject})
}


render() {
    let pageDisplay = ""
    if (!this.state.projects.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No projects to update - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (!this.state.selectedProject && this.state.projects.length){
    pageDisplay=
        this.state.projects.map(project => 
        <div key={project._id} className="editPerson">
            <input type="checkbox" name="person" onChange={this.handleChange} value={project.projectTitle} className="editPersonCheckbox"/>    
            <p style={{fontWeight: "bold"}}>{project.projectTitle}</p>
        </div>
    )
    } else if (this.state.selectedProject){
        pageDisplay = 
        <EditProjectForm 
        selectedProject = {this.state.selectedProject[0]}
        />
    }

      return (
        <div className="editTeamContainer">
            <h1 className="titleHead">Edit a Project</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default EditProject