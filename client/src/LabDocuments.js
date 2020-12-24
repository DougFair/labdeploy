import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'

class LabDocuments extends Component {

state ={
    documents: [],
    }

componentDidMount (){
    axios.get("http://localhost:3001/labdocuments")
    .then(response => {
    let sortedArray = response.data.sort(function(a, b){
    var x = a.documentCategory.toLowerCase();
    var y = b.documentCategory.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
    });
     this.setState({documents: sortedArray}) 
    })
}

render() {
    let pageDisplay = ""
    if (!this.state.documents.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No documents to update - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.documents.length) {  
        pageDisplay =
        this.state.documents.map((document, idx) => 
            <div className="displayContainer">
                <div className="categoryHeading">
                    {idx > 0 ? document.documentCategory !== this.state.documents[idx-1].documentCategory ?
                    <h3 style={{marginBottom:0}}>{document.documentCategory}</h3> : null : <h3 style={{marginBottom:0}}>{document.documentCategory}</h3>}
                </div>
            <div key={document._id} className="editDisplay">
                <div  className="editPerson">
                    <a className="documentItem" href={document.documentFilePath} target="_blank" ><p >{document.documentName}</p></a>
                    <p>{"\u00A0"} - created by {document.documentPreparedBy}</p>
                </div>
            </div>
            <div >

            </div>
            {idx > 0 ? document.documentCategory !== this.state.documents[idx-1].documentCategory ?
                <hr className="docHR"/> : <hr className="docHR"/> : null}
        </div>
    )
} 

      return (
        <div className="editTeamContainer">
            <h1 className="titleHeadDoc">Lab Documents</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default LabDocuments