import React, {Component} from 'react'
import "./editTeamMember.css"
import axios from 'axios'
import {Redirect} from "react-router-dom"

class DeleteLabDocument extends Component {

state ={
    documents: [],
    deleted: false
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
    let check = window.confirm(`Are you sure you want to delete ${evt.target.value}`)
    if (check) {
        this.state.documents.forEach(document => {
            if(document.documentName === evt.target.value) {
            axios.delete(`http://localhost:3001/deleteLabDocument/${document._id}`)
            .then(response => {
                if(response.data === "deleted"){
                    if (document.documentFilePath){
                    axios.post(`http://localhost:3001/labdocumentphotodelete/${document.documentFilePath.slice(56)}`)
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
    if (!this.state.deleted){
    pageDisplay=
    this.state.documents.map(document => {
        return(
        <div key={document._id} className="editDisplay">
            <div className="editPerson">
                <input type="checkbox" name="document" onChange={this.handleChange} value={document.documentName} className="editPersonCheckbox" checked={false}/>    
                <p style={{fontWeight: "bold"}}>{document.documentName}</p>
                <p>{"\u00A0"} - created by {document.documentPreparedBy}</p>
            </div>
        </div>
    )
    })
    } else {
    pageDisplay = <Redirect to="/admin/home"/>
    }

      return (
        <div className="editTeamContainer">
            <h1 className="titleHead">Delete a Document</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div> 
     )
    }
}
export default DeleteLabDocument