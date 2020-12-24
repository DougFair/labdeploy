import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class EditLabDocumentForm extends Component {
    state = {
        _id: "",
        documentName: "",
        documentCategory: "",
        newdocumentCategory: "",
        documentPreparedBy: "",
        documentFilePath: "",
        file: "",
        edited: false,
        newDocumentPath: "",
        documentCategories:[]
    }

componentDidMount (){
    let newDocCats =[]
    const {_id, documentName, documentCategory, documentPreparedBy, documentFilePath} = this.props.selectedDocument
    this.props.documents.forEach(document => {
        if(!this.state.documentCategories.includes(document.documentCategory)) {
            newDocCats.push(document.documentCategory)
        } 
    })
    this.setState({_id, documentName, documentCategory, documentPreparedBy, documentFilePath, documentCategories: newDocCats}) 
}

handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})
}   

handleSubmit = (evt) => {
        if (evt) evt.preventDefault() 
        let correctdocumentCategory =""
        if(this.state.newdocumentCategory) {
        correctdocumentCategory = this.state.newdocumentCategory 
         } else {correctdocumentCategory = this.state.documentCategory
         } 
        let post = {_id: this.state._id, documentName: this.state.documentName, documentCategory: correctdocumentCategory, documentPreparedBy: this.state.documentPreparedBy,documentFilePath: this.state.documentFilePath}
        axios.put("http://localhost:3001/editLabDocument", {post})
        .then(response => this.setState({edited: true})
    )
}
    

deletePhotoNow = (path) => {
    axios.post(`http://localhost:3001/labdocumentphotodelete/${path.slice(56)}`, {id: this.state._id})
    .then(response => response.data)
    .then(this.handleSubmit())
}

newDocumentAdd = (path) => {
    let oldPath = ""
    if(this.state.documentFilePath) {
        oldPath = this.state.documentFilePath
    }
    this.setState({documentFilePath: path}, () => {
        if(oldPath) {
        this.deletePhotoNow(oldPath)
         } else {this.handleSubmit()}
    })    
}

handleDocumentChange = (evt) => {
    this.setState({file:evt.target.files[0]})
}


handleDocumentSubmit = (e) => {
    e.preventDefault() 
    let url="http://localhost:3001/labdocumentPDFupload"
      
    let file = this.state.file 
  
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      axios.post(url, formData, config)
      .then(response => this.newDocumentAdd(response.data))
}



render() {
    let pageDisplay = ""
    if (!this.state.edited){
    pageDisplay = 
    <div>
        <form onSubmit={this.state.file ? this.handleDocumentSubmit : this.handleSubmit} className="teamMemberForm" encType="multipart/form-data">
    
                <label htmlFor="documentName" className="blogFormLabel">Document Name</label>
                <input type="text" id="documentName" name="documentName" value={this.state.documentName} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Enter a descriptive document name"/>
    
                <label htmlFor="documentCategory" className="blogFormLabel">Document Category</label>
                <select type="text" id="documentCategory" name="documentCategory" onChange={this.handleChange} className="blogPostTitleInput" placeholder="Document Name" value={this.state.documentCategory || ""}>
                    {this.state.documentCategories.length && this.state.documentCategories.map(cat =>
                    <option value={cat}>{cat}</option>)
                    }
                    <option value="Other">Other</option>
                </select>

                {this.state.documentCategory === "Other" && 
                <input type="text" id="documentName" name="newdocumentCategory"  value={this.state.newdocumentCategory} onChange={this.handleChange} className="documentInput" placeholder="Enter a category for this document"/>
                }

                <label htmlFor="documentPreparedBy" className="blogFormLabel">Document Prepared By</label>
                <input type="text" id="documentPreparedBy" name="documentPreparedBy" value={this.state.documentPreparedBy} onChange={this.handleChange} className="blogPostTitleInput" placeholder="Name of person who prepared this document"/>


                <div className="uploadForm">
                    <label htmlFor="documentUpload">Replace the Document</label>
                    <input type="file" id="documentUpload" className="uploadFileInput" name="photo" onChange={this.handleDocumentChange}/>
                </div>

                <input className="blogPostAddButton" type="submit" value="Submit"/>
        </form>


    </div>
    } else {
       pageDisplay = <Redirect to="/admin/home" />
    }

      return (
        <div className="editTeamContainer">
            {pageDisplay}
        </div> 
     )
}}

export default EditLabDocumentForm