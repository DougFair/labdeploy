import React, {Component} from 'react'
import axios from 'axios'
import { PDFDocument } from 'pdf-lib'
import "./pdfphotoAddForm.css"


class PDFAddForm extends Component {
    constructor(props){
    super(props)
    this.state ={
        file: null,
        fileArray: null,
        id: "",
        displayPage: 1,
        pdfAvailable: true,
        pdfDisplayPageFile: null
      }
      this.handleFirstPage = this.handleFirstPage.bind(this)
    }
componentDidMount (){
        this.setState({id:this.props.paper._id})
    }

handleDisplayPageChange = (evt) => {
        evt.preventDefault()
        let displayPage = evt.target.value
        this.setState({displayPage})
    }

handleSubmit = (e) => {
        e.preventDefault() 
        if (!this.state.file){
        alert("You must select a file before submitting")
        } else {
        let url=`http://localhost:3001/pdfCreate/${this.state.id}`
        let file = this.state.file 
      
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
          axios.put(url, formData, config)
          .then(response=>console.log("file uploaded1"))
        //   .then(this.props.handleUpload)
          .then(this.handleFirstPage)
        }
}

handleFirstPage = async function  () {
    let displayPageFile = ""
    const displayPageNumber = this.state.displayPage

    let url=`http://localhost:3001/pdfCreateFirstPage/${this.state.id}`
    const fileToMod = this.state.fileArray
    
    const pdfDoc = await PDFDocument.create()
    const pdfDonorDoc = await PDFDocument.load(fileToMod)
    
    const [pageToDisplay] = await pdfDoc.copyPages(pdfDonorDoc, [displayPageNumber])
    pdfDoc.addPage(pageToDisplay)
    displayPageFile = await pdfDoc.save()
    const displayPageFileBlob = await new Blob(displayPageFile, {type: "application/pdf"})

    this.setState({pdfDisplayPageFile: displayPageFileBlob}, () => {
        const formData = new FormData();
        formData.append('file',this.state.pdfDisplayPageFile)
        const config = {
            headers: {
                'content-type': 'application/octet-stream'
                }
            }
          axios.put(url, formData, config)
          .then(response=>alert("file uploaded"))
          .then(this.props.handleUpload) 
    })
}  




handleFile = (evt) => {
    const fileArray = evt.target.result
    this.setState({fileArray})
}     

      
handleChange = (evt) => {
    evt.preventDefault()
        
        const file = evt.target.files[0]
        this.setState({file}, () => {
        const reader = new FileReader()
        reader.onload = function(event) {
            // fileArray = event.target.result
            console.log(event.target.result)
          };
        reader.onloadend = this.handleFile
        reader.readAsArrayBuffer(file)    
      }
      )}

submitDisplayPage = (evt) => {
        evt.preventDefault()
        let id = this.state.id
        let displayPage = this.state.displayPage
        axios.put("http://localhost:3001/updateDisplayPage", {id, displayPage}) 
        .then(response => {
            console.log("updated")
        })
    }

handlePDFAvailableChange = (evt) => {
    if (evt.target.name === "no") {
        this.setState({pdfAvailable: false}, () => {
        axios.put("http://localhost:3001/updatePDFAvailable", {id: this.state.id, pdfAvailable:this.state.pdfAvailable}) 
        .then(response => {
            console.log("updated")
        })
    }) 
    } else {
        this.setState({pdfAvailable: true}, () => {
            axios.put("http://localhost:3001/updatePDFAvailable", {id: this.state.id, pdfAvailable:this.state.pdfAvailable}) 
            .then(response => {
                console.log("updated")
            })
        }) 
    }
}


render () {
    return (
    <div>
        <div className="mediaAddFormDisplayContainer">
            <p className="mediaAddFormSubHeading">Page 1 of your PDF will be displayed by default in the paper gallery</p>
                <div className="formContainer">
                    <p>If you want another page displayed, enter the number here:</p>
                    <form onSubmit={this.submitDisplayPage}>
                        <input type="number" name="displayPage" value={this.state.displayPage} className="displayPageInput" onChange={this.handleDisplayPageChange}/>
                        <button type="submit" className="pageNumberButton">Change</button>
                    </form>
                </div>   

                    <p>Do you want to make this PDF available for public download?</p>
                    <div className="publicPDFForm">
                        <input type="checkbox" id="yes" name="yes" checked={this.state.pdfAvailable} className="" onChange={this.handlePDFAvailableChange}/>
                        <label htmlFor="yes">Yes</label>
                        <input type="checkbox" id="no" name="no" className="" onChange={this.handlePDFAvailableChange} checked={!this.state.pdfAvailable}/>
                        <label htmlFor="no">No</label>
                    </div>
                    <p className="publicPDFWarning">If yes, please check this does not infringe copyright</p>
        </div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="uploadForm">
                <label htmlFor="pdfUpload">Select a PDF file to upload to this paper</label>
                <input onChange={this.handleChange} type="file" id="pdfUpload" className="uploadFileInput" placeholder="Upload PDF"/>
            </div>
            <div className="uploadForm">
                <button type="submit" className="uploadButton">Upload PDF</button>
            </div>
        </form>
    </div>
)}
}

export default PDFAddForm