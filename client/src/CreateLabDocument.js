import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./createLabDocument.css"
import axios from 'axios'

class CreateLabDocument extends Component {
    state = {
        documentName: "",
        documentCategory: "",
        newdocumentCategory: "",
        documentPreparedBy: "",
        documentFilePath: "",
        file: "",
        documentCreated: false,
        documentCategories: []
    }

componentDidMount (){
    let newDocCats = []
    axios.get("http://localhost:3001/labdocuments")
    .then(response => {
        newDocCats = response.data.map(document => !this.state.documentCategories.includes(document.documentCategory) && newDocCats.push(document.documentCategory) )
    })
    .then(this.setState({documentCategories: newDocCats}))
}

handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value})

}

handleSubmit = () => {
    let correctdocumentCategory =""
    if(this.state.newdocumentCategory) {
    correctdocumentCategory = this.state.newdocumentCategory 
     } else {correctdocumentCategory = this.state.documentCategory
     }

    let document = {documentName: this.state.documentName, documentCategory: correctdocumentCategory, documentPreparedBy: this.state.documentPreparedBy,documentFilePath: this.state.documentFilePath}

    axios.post("http://localhost:3001/createLabDocument", {document})
    .then(this.setState({documentCreated: true}))
}

handleDocumentChange = (evt) => {
    this.setState({file:evt.target.files[0], type:evt.target.name})
}


handlePDFSubmit = (e) => {
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
    .then(response => this.setState({documentFilePath: response.data}))
    .then(this.handleSubmit)
}
 

render(){
    let pageDisplay = ""
    if (!this.state.documentCreated){
    pageDisplay = 
    <div className="createDocumentContainer">

        <div className="createDocumentHeading">
            <h1>Upload a New Document</h1>
        </div> 

        <form onSubmit={this.handlePDFSubmit} className="addDocumentForm" encType="multipart/form-data">
    
                <label htmlFor="documentName" className="documentFormLabel">Document Name</label>
                <input type="text" id="documentName" name="documentName" value={this.state.documentName} onChange={this.handleChange} className="documentInput" placeholder="Enter a descriptive document name"/>
    
                <label htmlFor="documentCategory" className="documentFormLabel">Document Category</label>
                <select type="text" id="documentCategory" name="documentCategory" onChange={this.handleChange} className="documentInput" placeholder="Document Name">
                    <option hidden value=""> -- select a category -- </option>
                    {this.state.documentCategories.length &&this.state.documentCategories.map(cat =>
                    <option key={cat} value={cat}>{cat}</option>)
                    }
                    <option value="Other">Other</option>
                </select>

                {this.state.documentCategory === "Other" && 
                <input type="text" id="documentName" name="newdocumentCategory"  value={this.state.newdocumentCategory} onChange={this.handleChange} className="documentInput" placeholder="Enter a category for this document"/>
                }

                <label htmlFor="documentPreparedBy" className="documentFormLabel">Document Prepared By</label>
                <input type="text" id="documentPreparedBy" name="documentPreparedBy" value={this.state.documentPreparedBy} onChange={this.handleChange} className="documentInput" placeholder="Name of person who prepared this document"/>


                <div className="uploadForm">
                    <label htmlFor="documentUpload">Upload the document</label>
                    <input type="file" id="documentUpload" className="uploadFileInput" name="photo" onChange={this.handleDocumentChange}/>
                </div>

                <input className="blogPostAddButton" type="submit" value="Submit"/>
        </form>

    </div>
    } else {
        pageDisplay = <Redirect 
        to="/admin/home" 
        />
    }

    return(
       <div>
       {pageDisplay} 
       </div> 
    )
    }
}
export default CreateLabDocument