import React, { Component } from 'react';
import axios from 'axios'
import PaperDisplay from './PaperDisplay'
import {Route, Switch} from 'react-router-dom'
import Toolbar from './Toolbar'
import Home from './Home'
import AdminHomeForm from './AdminHomeForm'
import AddPaperSearch from './AddPaperSearch'
import AddPaperManual from './AddPaperManual'
import UpdatePaper from './UpdatePaper'
import DeletePaper from './DeletePaper'
import AddMedia from './AddMedia'
import DeleteMedia from './DeleteMedia'
import CreateSite from "./CreateSite"
import EditSite from "./EditSite"
import CreateBlogPost from "./CreateBlogPost"
import UpdateBlogPost from "./UpdateBlogPost"
import DeleteBlogPost from "./DeleteBlogPost"
import Blogs from './Blogs'
import CreateTeamMember from "./CreateTeamMember"
import EditTeamMember from "./EditTeamMember"
import DeleteTeamMember from "./DeleteTeamMember"
import TeamMembers from "./TeamMembers"
import CreateProject from "./CreateProject"
import EditProject from "./EditProject"
import DeleteProject from "./DeleteProject"
import Projects from "./Projects"
import CreateLabDocument from "./CreateLabDocument"
import EditLabDocument from "./EditLabDocument"
import DeleteLabDocument from "./DeleteLabDocument"
import LabDocuments from "./LabDocuments"
import LabPhotos from "./LabPhotos"
import CreateLabPhoto from "./CreateLabPhoto"
import EditLabPhoto from "./EditLabPhoto"
import DeleteLabPhoto from "./DeleteLabPhoto"


import "./App.css"

class App extends Component {
  state = {
    id: "",
    labName:"",
    labDescription:"",
    labSubheading:"",
    labMinorheading:"",
    labNameColor: "",
    labNameSize: "",
    labSubheadingColor: "",
    labSubheadingSize: "",
    labMinorheadingColor:"",
    labMinorheadingSize:"",
    menuBarColor: "",
    menuBarTextColor: "",
    labDescriptionColor: "",
    labDescriptionBkdColor: "",
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
    themeColor:"",
    siteDataError: false,
    currentPage: 1,
  }
 
  componentDidMount () {
    const data1 = {keey1: "vakue1"}
    axios.post("/routes/siteinfo/siteInfo", data1)
    axios.get("/routes/siteinfo/siteInfo")
    .then(response => {
      if (response.data[0].labName){
  
        let {_id, labName, labNameSize, labNameColor, labDescription, labSubheading, labSubheadingSize, labSubheadingColor, labMinorheading, labMinorheadingSize, labMinorheadingColor, menuBarColor, menuBarTextColor,labDescriptionColor, labDescriptionBkdColor, blogHeading, blogHeadingColor, blogPostHeadingColor, publicationPageHeadingColor, projectPageHeadingColor,projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor, themeColor} = response.data[0]
        
        this.setState({labName, labNameSize, labNameColor, labDescription, labSubheading, labSubheadingSize,labSubheadingColor, menuBarColor, menuBarTextColor, labDescriptionColor, labDescriptionBkdColor,  labMinorheading, labMinorheadingSize, labMinorheadingColor,  blogHeading, blogHeadingColor, blogPostHeadingColor, publicationPageHeadingColor,projectPageHeadingColor, projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor, id: _id})
  
    } else {
        this.setState({siteDataError: true})
    }
  })
  }

siteCreated = () => {
  axios.get("http:///routes/siteInfo/siteInfo")
  .then(response => {
    let {labName, labDescription, labSubheading, labMinorheading} = response.data[0]
    this.setState({labName, labDescription, labSubheading, labMinorheading, siteDataError: false})
})
}

siteEdited = () => {
  axios.get("http:///routes/siteInfo/siteInfo")
  .then(response => {
    let {labName, labDescription, labSubheading, labMinorheading,labNameColor,labNameSize,labSubheadingColor, labSubheadingSize, menuBarColor, menuBarTextColor,labDescriptionColor, labDescriptionBkdColor, labMinorheadingColor, labMinorheadingSize, blogHeading, blogHeadingColor, blogPostHeadingColor, projectPageHeadingColor, projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor} = response.data[0]
    
    this.setState({labName, labDescription, labSubheading,labMinorheading, labNameColor,labNameSize,labSubheadingColor, labSubheadingSize, labMinorheadingColor, labMinorheadingSize, menuBarColor, menuBarTextColor,labDescriptionColor,labDescriptionBkdColor, blogHeading,
      blogHeadingColor, blogPostHeadingColor, projectPageHeadingColor, projectHeadingColor, peoplePageHeadingColor,peopleHeadingColor, photoPageHeadingColor, photoHeadingColor,themeColor, siteDataError: false})
})
}


render() {
  let {currentPage, siteDataError} = this.state

    return (
    <div>
        <Toolbar 
        menuBarColor = {this.state.menuBarColor}
        menuBarTextColor = {this.state.menuBarTextColor}
        />
        {siteDataError && <h2>There was an error loading the page.</h2>}

        <Switch>
          <>
          <Route exact path="/" render= {() => 
            <>
            <div className="frontPage">
            <Home 
            labdetails={this.state}
            />
             
            <Blogs
            blogHeading={this.state.blogHeading}
            blogHeadingColor={this.state.blogHeadingColor}
            blogPostHeadingColor={this.state.blogPostHeadingColor}
            />
            </div>
           </>
            }
            />
        
            <Route exact path="/pubsgallery" render={()=>
            <PaperDisplay
            publicationPageHeadingColor={this.state.publicationPageHeadingColor}
            currentPage={currentPage}/>
            }/>
            
            <Route exact path="/admin/home" render={()=>
            <AdminHomeForm
            />
            }
            /> 

          <Route exact path="/adminhome/createsite" render={()=>
            <CreateSite
            siteCreated = {this.siteCreated}
            />
            }
            /> 

          <Route exact path="/adminhome/editsite" render={()=>
            <EditSite
            siteInfo = {this.state}
            siteEdited = {this.siteEdited}
            />
            }
            />

          <Route exact path="/adminhome/createBlogPost" render={()=>
            <CreateBlogPost
            />
            }
            /> 
            
          <Route exact path="/adminhome/updateBlogPost" render={(routeProps)=>
            <UpdateBlogPost
            {...routeProps}
            />
            }
            /> 

          <Route exact path="/adminhome/deleteBlogPost" render={(routeProps)=>
            <DeleteBlogPost
            {...routeProps}
            />
            }
            /> 
            
          <Route exact path="/adminhome/addpublicationsearch" render={()=>
            <AddPaperSearch
            />
            }
            /> 

          <Route exact path="/adminhome/addpublicationmanual" render={()=>
            <AddPaperManual
            />
            }
            /> 

          <Route exact path="/adminhome/editpublication" render={()=>
            <UpdatePaper
            />
            }
            /> 
            
          <Route exact path="/adminhome/deletepublication" render={()=>
            <DeletePaper
            />
            }
            /> 
            
          <Route exact path="/adminhome/addmedia" render={(routeProps)=>
            <AddMedia
            {...routeProps}
            />
            }
            />

          <Route exact path="/adminhome/deletemedia" render={(routeProps)=>
            <DeleteMedia
            {...routeProps}
            />
            }
            />

          <Route exact path="/team" render={()=>
            <TeamMembers
            peoplePageHeadingColor={this.state.peoplePageHeadingColor}
            peopleHeadingColor={this.state.peopleHeadingColor}
            />
            }
            /> 

          <Route exact path="/adminhome/createmember" render={()=>
            <CreateTeamMember
            />
            }
            /> 

          <Route exact path="/adminhome/editmember" render={(routeProps)=>
            <EditTeamMember
            {...routeProps}
            />
            }
            /> 
            
          <Route exact path="/adminhome/deletemember" render={(routeProps)=>
            <DeleteTeamMember
            {...routeProps}
            />
            }
            /> 

          <Route exact path="/projects" render={()=>
            <Projects
            projectPageHeadingColor = {this.state.projectPageHeadingColor}
            projectHeadingColor = {this.state.projectHeadingColor}
            />
            }
            />

          <Route exact path="/adminhome/createproject" render={()=>
            <CreateProject
            />
            }
            /> 

          <Route exact path="/adminhome/editproject" render={(routeProps)=>
            <EditProject
            {...routeProps}
            />
            }
            /> 
            
          <Route exact path="/adminhome/deleteproject" render={(routeProps)=>
            <DeleteProject
            {...routeProps}
            />
            }
            /> 

          <Route exact path="/labdocuments" render={(routeProps)=>
            <LabDocuments
            {...routeProps}
            />
            }
            />

          <Route exact path="/adminhome/createlabdocument" render={()=>
            <CreateLabDocument
            />
            }
            /> 

          <Route exact path="/adminhome/editlabdocument" render={(routeProps)=>
            <EditLabDocument
            {...routeProps}
            />
            }
            /> 
            
          <Route exact path="/adminhome/deletelabdocument" render={(routeProps)=>
            <DeleteLabDocument
            {...routeProps}
            />
            }
            /> 

          <Route exact path="/photos" render={(routeProps)=>
            <LabPhotos
            {...routeProps}
            photoPageHeadingColor={this.state.photoPageHeadingColor}
            photoHeadingColor={this.state.photoHeadingColor}
            />
            }
            />

          <Route exact path="/adminhome/createlabphoto" render={()=>
            <CreateLabPhoto
            />
            }
            /> 

          <Route exact path="/adminhome/editlabphoto" render={(routeProps)=>
            <EditLabPhoto
            {...routeProps}
            />
            }
            /> 
            
          <Route exact path="/adminhome/deletelabphoto" render={(routeProps)=>
            <DeleteLabPhoto
            {...routeProps}
            />
            }
            /> 
            </> 
        </Switch>
      </div>
    );
  }
}

export default App