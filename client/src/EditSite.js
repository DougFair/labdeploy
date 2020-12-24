import React, {Component} from 'react'
import axios from 'axios'
import "./createSite.css"
import {Redirect} from 'react-router-dom'
import PhotoAddForm from './PhotoAddForm'

class EditSite extends Component {

    state = {
        _id: "",
        labName:"",
        labDescription: "",
        labDescriptionColor: "",
        labDescriptionBkdColor: "",
        labSubheading: "",
        labMinorheading: "",
        labNameSize: "",
        labNameColor: "",
        labSubheadingSize: "",
        labSubheadingColor: "",
        labMinorheadingSize: "",
        labMinorheadingColor: "",
        menuBarColor: "",
        menuBarTextColor: "",
        blogHeading:"",
        blogHeadingColor:"",
        blogPostHeadingColor:"",
        publicationPageHeadingColor:"",
        projectPageHeadingColor:"",
        projectHeadingColor:"",
        peoplePageHeadingColor:"",
        peopleHeadingColor:"",
        photoPageHeadingColor:"",
        photoHeadingColor:"",
        themeColor: "",
        siteUpdated: false,
    }

componentDidMount () {
    axios.get("http://localhost:3001/siteInfo")
    .then(response => {
      if (response.data[0].labName){
        let {_id, labName, labNameSize, labNameColor, labDescription, labSubheading, labSubheadingSize, labSubheadingColor, labMinorheading, labMinorheadingSize, labMinorheadingColor, menuBarColor, menuBarTextColor,labDescriptionColor, labDescriptionBkdColor, blogHeading, blogHeadingColor, blogPostHeadingColor, projectPageHeadingColor, publicationPageHeadingColor, projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor} = response.data[0]
        
        this.setState({labName, labNameSize, labNameColor, labDescription, labSubheading, labSubheadingSize,labSubheadingColor, labMinorheading, labMinorheadingSize, labMinorheadingColor, menuBarColor, menuBarTextColor,labDescriptionColor, labDescriptionBkdColor, blogHeading,blogHeadingColor, blogPostHeadingColor, publicationPageHeadingColor, projectPageHeadingColor, projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor, _id})
    } else {
        this.setState({siteDataError: true})
    }
  })
}

handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})
}

handleThemeChange = (evt) => {
    const themeColor = evt.target.value
    this.setState({labNameColor: themeColor, labSubheadingColor: themeColor, labMinorheadingColor:themeColor, menuBarColor:themeColor, blogHeadingColor: themeColor, blogPostHeadingColor: themeColor, publicationPageHeadingColor: themeColor, projectPageHeadingColor: themeColor, projectHeadingColor: themeColor, peoplePageHeadingColor: themeColor,peopleHeadingColor: themeColor, photoPageHeadingColor: themeColor, photoHeadingColor: themeColor,themeColor})
}


handleSubmit = (evt) => {
    evt.preventDefault()
    const {_id, labName, labNameSize, labNameColor, labDescription, labSubheading, labSubheadingColor, labSubheadingSize,labMinorheading, labMinorheadingSize, labMinorheadingColor,menuBarColor, menuBarTextColor, labDescriptionBkdColor, labDescriptionColor, blogHeading, blogHeadingColor, blogPostHeadingColor, publicationPageHeadingColor, projectPageHeadingColor,   projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor} = this.state
    
    let site = {_id, labName, labNameSize, labNameColor, labDescription, labSubheading, labSubheadingColor, labSubheadingSize, labMinorheading, labMinorheadingSize, labMinorheadingColor, menuBarColor, menuBarTextColor, labDescriptionBkdColor, labDescriptionColor, blogHeading, publicationPageHeadingColor, blogHeadingColor, blogPostHeadingColor, projectPageHeadingColor, projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor}

    axios.put("http://localhost:3001/editSite", {site})
    .then(response => this.props.siteEdited())
    .then(response => this.setState({siteUpdated: true}), () => {
        alert("Site has been updated!")
    })
}

    render () {
        let pageDisplay=""
        if(!this.state.siteUpdated) {
        
        pageDisplay =
        <div className="createSiteContainer">
           <form onSubmit={this.handleSubmit} className="createSiteForm">
           
           <h3 className="customiseHeading">Site Theme Color</h3>
            <p>Choose a color for all of you page headings and subheadings.</p>
            <p>These can be further customized below if you want to change individual colors.</p>
                <div className="rowInput">
                    <label htmlFor="themeColor" className="smallInputLabel">Set Theme Color:</label>
                    <input type="color" name="themeColor" value={this.state.themeColor} onChange={this.handleThemeChange} className="smallInput"/>
                </div>

<hr/>

            <label htmlFor="labName" className="formLabel">Site Name</label>
            <input type="text" name="labName" value={this.state.labName} onChange={this.handleChange} className="createSiteInput"/>
            

                <h3 className="customiseHeading">Customise Lab Name Appearance</h3>
                <div className="rowInput">
                    <label htmlFor="labNameSize" className="smallInputLabel">Change Site Name Font Size (default value: 3):</label>
                    <input type="text" name="labNameSize" value={this.state.labNameSize} onChange={this.handleChange} className="smallInput"/>
                </div>

 
                <div className="rowInput">
                    <label htmlFor="labNameColor" className="smallInputLabel">Change Site Name Color (default: black): </label>
                    <input type="color" name="labNameColor" value={this.state.labNameColor || this.state.themeColor } onChange={this.handleChange} className="smallInput"/>
                </div>

            <hr/>

            <label htmlFor="labSubheading" className="formLabel">Site Sub-heading</label>
            <input type="text" name="labSubheading" value={this.state.labSubheading} onChange={this.handleChange} className="createSiteInput"/>

            <h3 className="customiseHeading">Customise Sub-heading Appearance</h3>
            <div className="rowInput">
                <label htmlFor="labSubheadingSize" className="smallInputLabel">Change Site Sub-heading Font-Size (default: 2): </label>
                <input type="text" name="labSubheadingSize" value={this.state.labSubheadingSize} onChange={this.handleChange} className="smallInput"/>
            </div>

            <div className="rowInput">
                <label htmlFor="labSubheadingColor" className="smallInputLabel">Change Site Sub-heading Color (default: black):</label>
                <input type="color" name="labSubheadingColor" value={this.state.labSubheadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>
            <hr/>

            <label htmlFor="labSubheading" className="formLabel">Site Minor Heading</label>
            <input type="text" name="labMinorheading" value={this.state.labMinorheading} onChange={this.handleChange} className="createSiteInput"/>

            <h3 className="customiseHeading">Customise Minor Heading Appearance</h3>
            <div className="rowInput">
                <label htmlFor="labSubheadingSize" className="smallInputLabel">Change Site Minor Heading Font-Size (default: 1.5): </label>
                <input type="text" name="labMinorheadingSize" value={this.state.labMinorheadingSize} onChange={this.handleChange} className="smallInput"/>
            </div>

            <div className="rowInput">
                <label htmlFor="labSubheadingColor" className="smallInputLabel">Change Site Minor Heading Color (default: black):</label>
                <input type="color" name="labMinorheadingColor" value={this.state.labMinorheadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>
            <hr/>

            <h3 className="customiseHeading">Customise Menu Appearance</h3>
            <div className="rowInput">
                <label htmlFor="menuBarColor" className="smallInputLabel">Change Menu Bar Color (default: black):</label>
                <input type="color" name="menuBarColor" value={this.state.menuBarColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>

            <div className="rowInput">
                <label htmlFor="menuBarTextColor" className="smallInputLabel">Change Menu Bar Text Color (default: white):</label>
                <input type="color" name="menuBarTextColor" value={this.state.menuBarTextColor} onChange={this.handleChange} className="smallInput"/>  
            </div>

            <hr/>

            <label htmlFor="labDescription" className="formLabel">Lab Description</label>
            <textarea type="text" name="labDescription" rows="20" cols="65" value={this.state.labDescription} onChange={this.handleChange} className="createSiteInput"/>
            
            <h3 className="customiseHeading">Customise Lab Description Appearance</h3>
            <div className="rowInput">
                <label htmlFor="labDescriptionColor" className="smallInputLabel">Change Lab Description Text Color (default: black):</label>
                <input type="color" name="labDescriptionColor" value={this.state.labDescriptionColor ? this.state.labDescriptionColor : "#000000"} onChange={this.handleChange} className="smallInput"/>  
            </div>

            <div className="rowInput">
                <label htmlFor="labDescriptionBkdColor" className="smallInputLabel">Change Lab Description Background Color (default: grey):</label>
                <input type="color" name="labDescriptionBkdColor" value={this.state.labDescriptionBkdColor ? this.state.labDescriptionBkdColor : "#d3d3d3"} onChange={this.handleChange} className="smallInput"/>  
            </div>
            
            <hr/>
            <h3 className="customiseHeading">Customise Blog Appearance</h3>
            <p>What do you want to call your blog? (default: "Latest News")</p>
            <label htmlFor="blogDescription" className="formLabel">Main Blog Heading</label>
            <input type="text" name="blogHeading" value={this.state.blogHeading} onChange={this.handleChange} className="createSiteInput" />
            
            
            <div className="rowInput">
                <label htmlFor="blogDescriptionColor" className="smallInputLabel">Change Blog Main Heading Text Color (default: black):</label>
                <input type="color" name="blogHeadingColor" value={this.state.blogHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/> 
            </div>
            <div className="rowInput">
                <label htmlFor="blogPostHeadingColor" className="smallInputLabel">Change Blog Post Heading Text Color (default: black):</label>
                <input type="color" name="blogPostHeadingColor" value={this.state.blogPostHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>

            <hr/>

            <h3 className="customiseHeading">Customise Publication Page Appearance</h3>
      
            <div className="rowInput">
                <label htmlFor="publicationPageColor" className="smallInputLabel">Change Publication Page Main Heading Text Color (default: black):</label>
                <input type="color" name="publicationPageHeadingColor" value={this.state.publicationPageHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>
            <hr/>

            <h3 className="customiseHeading">Customise People Page Appearance</h3>
      
            <div className="rowInput">
                <label htmlFor="peoplePageColor" className="smallInputLabel">Change People Page Main Heading Text Color (default: black):</label>
                <input type="color" name="peoplePageHeadingColor" value={this.state.peoplePageHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>
            <div className="rowInput">
                <label htmlFor="blogPostHeadingColor" className="smallInputLabel">Change Person Heading Color (default: black):</label>
                <input type="color" name="peopletHeadingColor" value={this.state.peopleHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>

            <hr/>
            <h3 className="customiseHeading">Customise Projects Page Appearance</h3>
      
            <div className="rowInput">
                <label htmlFor="peoplePageHeadingColor" className="smallInputLabel">Change Project Page Main Heading Text Color (default: black):</label>
                <input type="color" name="peoplePageHeadingColor" value={this.state.projectPageHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>
            <div className="rowInput">
                <label htmlFor="peopleHeadingColor" className="smallInputLabel">Change Project Heading Color (default: black):</label>
                <input type="color" name="peopleHeadingColor" value={this.state.projectHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>

            <hr/>
            
            <h3 className="customiseHeading">Customise Photos Page Appearance</h3>
      
            <div className="rowInput">
                <label htmlFor="photoPageHeadingColor" className="smallInputLabel">Change Photos Page Main Heading Text Color (default: black):</label>
                <input type="color" name="peoplePageHeadingColor" value={this.state.photosPageHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>
            <div className="rowInput">
                <label htmlFor="photoHeadingColor" className="smallInputLabel">Change Project Heading Color (default: black):</label>
                <input type="color" name="photoHeadingColor" value={this.state.photosHeadingColor || this.state.themeColor} onChange={this.handleChange} className="smallInput"/>  
            </div>

           <button className="createButton" type="submit">Submit</button>
            </form>
            </div>
 
        }  else {
            pageDisplay= <Redirect to="/" />
        }
    return (
        pageDisplay
    )
}
}

export default EditSite