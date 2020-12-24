import React, {Component} from 'react'
import "./projects.css"
import axios from 'axios'

class Projects extends Component {

state ={
    projects: []
      }

componentDidMount (){
        axios.get("http://localhost:3001/projects")
        .then(response => this.setState({projects: response.data}))
}

render() {
    let pageDisplay = ""
    if (this.state.projects.length){
    pageDisplay=this.state.projects.map(project => 
    <div key={project._id} className="project">
        <div className="titleHead">
            <h3 style={{color: this.props.projectHeadingColor}}>{project.projectTitle}</h3>
        </div>
        
        <div className="imageDescription">
            
            {project.projectPhotoPath ? 
            <img src={project.projectPhotoPath} className="image" alt="project pic"/>
            : null
            }
            <div className="description">
            {project.projectDescription}
            </div>
        </div>

        {project.projectFunding ?
            <p>Project funding: {project.projectFunding}</p>
            : null
        }
        <hr className="projectHR"/>
    </div>
    )
    } else {
        pageDisplay = <h3>There are currently no projects</h3>
    }

      return (
        <div className="projectContainer">
            <h1 style={{color: this.props.projectPageHeadingColor}}>Projects</h1>
            {pageDisplay}
        </div> 
     )
    }
}
export default Projects