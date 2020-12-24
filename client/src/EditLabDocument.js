import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import EditLabDocumentForm from "./EditLabDocumentForm"

class EditLabDocument extends Component {

state ={
    documents: [],
    selectedDocument: ""
    }

componentDidMount (){
    axios.get("http://localhost:3001/labdocuments")
    .then(response => {
        let sortedArray = response.data.sort(function(a, b){
        var x = a.documentName.toLowerCase();
        var y = b.documentName.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
        });
        this.setState({documents: sortedArray})    
})
}


handleChange = (evt) => {
    let selectedDocument = this.state.documents.filter(doc => doc.documentName === evt.target.value)
    this.setState({selectedDocument})
}


render() {
    let pageDisplay = ""
    if (!this.state.documents.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No documents to update - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (!this.state.selectedDocument && this.state.documents.length){
    pageDisplay=
        this.state.documents.map(doc => 
        <div key={doc._id} className="editPerson">
            <input type="checkbox" name="person" onChange={this.handleChange} value={doc.documentName} className="editPersonCheckbox"/>    
            <p>{doc.documentName}</p>
        </div>
    )
    } else if (this.state.selectedDocument){
        pageDisplay = 
        <EditLabDocumentForm 
        selectedDocument = {this.state.selectedDocument[0]}
        documents = {this.state.documents}
        />
    }

      return (
        <div className="editTeamContainer">
            <h1 className="titleHead">Edit a Lab Document</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default EditLabDocument