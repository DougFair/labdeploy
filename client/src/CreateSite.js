import React, {Component} from 'react'
import axios from 'axios'
import "./createSite.css"

class CreateSite extends Component {

    state = {
        labName:"",
        labSubheading: "",
        labMinorheading: "",
        labMinorheading: "",
        labDescription: "",
        siteCreated: false,
    }

handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})
}

handleSubmit = (evt) => {
    evt.preventDefault()
    const {labName, labSubheading, labDescription, labMinorheading} = this.state
    let site = {labName, labDescription, labSubheading, labMinorheading}
    axios.post("http://localhost:3001/createsite", {site})
    .then(response => this.props.siteCreated)
    .then(this.setState({labName:"", labDescription:"", labSubheading: "", labMinorheading: ""}))
}

    render () {
        let pageDisplay=""
        if(!this.siteCreated) {
        pageDisplay =
        <div>  
            <div className="formDescriptor">
            <h3 className="descriptorHeading">Your site needs a name to display on the Home page. </h3>
                <p className="descriptorPara">This could be your name if the site is for just you, your lab name, or indeed, anything you want to call the page.</p>
                <p className="descriptorPara">This will be the "banner" heading on your page.</p>
            </div>
            
            <form onSubmit={this.handleSubmit} className="createSiteForm">
            <label htmlFor="labName" className="formLabel">Site Name<span className="required">{"\u00A0"}{"\u00A0"}(required)</span></label>
            <input type="text" name="labName" value={this.state.labName} onChange={this.handleChange} className="createSiteInput"/>
        <hr />
            <div className="formDescriptor">
                <h3 className="descriptorHeading">You can also enter some sub-headings</h3> 
                <p className="descriptorPara"> These appear in progressively smaller size text below the main site name.</p>
                <p className="descriptorPara">A basic example might include a brief description of your lab's research (sub-heading) and the name of your institute (minor heading).</p>
            </div>

            <label htmlFor="labSubheading" className="formLabel">Site Sub-heading<span className="required">{"\u00A0"}{"\u00A0"}(optional)</span></label>
            <input type="text" name="labSubheading" value={this.state.labSubheading} onChange={this.handleChange} className="createSiteInput"/>

            <label htmlFor="labMinorheading" className="formLabel">Site Minor heading<span className="required">{"\u00A0"}{"\u00A0"}(optional)</span></label>
            <input type="text" name="labMinorheading" value={this.state.labMinorheading} onChange={this.handleChange} className="createSiteInput"/>

            <hr />
            <div className="formDescriptor">
                <h3 className="descriptorHeading">You can also enter a brief description of your research</h3>
                <p className="descriptorPara"> e.g. the focus of your research or other information you want a visitor to know about your site.</p>
                <p className="descriptorPara"> This will apear in a highlight box under the banner.</p>
            </div>
            <label htmlFor="labDescription" className="formLabel">Lab Description<span className="required">{"\u00A0"}{"\u00A0"}(optional)</span></label>
            <textarea id="labDescription" rows="10" cols="65" name="labDescription" value={this.state.labDescription} onChange={this.handleChange} />

            <button type="submit" className="createButton">Create Website</button>
            </form>         
        </div>
        }  else {
            pageDisplay = <div style={{marginTop: "50px"}}><h1>Page</h1></div>
        }
    return (
        <div className="createSiteContainer">
        <div className="createSiteIntro">
        <h1>Create A Site!</h1>    
            <div className="createSiteDetails">
                <p className="createSiteDotPoint">• This form allows you to enter the basic details that are required to generate your site.</p>
                <p className="createSiteDotPoint">• Only a site name is required, though other information will enhance your site.</p>
                <p className="createSiteDotPoint">• All information you provide here can be later be edited by clicking on the "Edit website button" on the Administrator page.</p>
                <p className="createSiteDotPoint">• You will also be able to add extra stuff there such as photos, theme colors etc, once the initial site is generated</p>
                <hr/>
            </div>
        </div>
        {pageDisplay}
        </div>
    )
}
}

export default CreateSite