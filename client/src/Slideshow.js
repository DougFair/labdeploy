import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Slideshow extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    noteText: "",
  }
 

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  onDocumentLoadError = (error) => {
    console.log("error" + error.message)
  }

  
render() {
    const { pageNumber, numPages} = this.state;
  
    
 return (
      <div>
        <h1 style={{justifyContent: "center"}}>Hello</h1>

        <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
          <Document
            file="https://labpublications.s3.ap-southeast-2.amazonaws.com/1581856303189-Box%2038313%20Wellington%20Mail%20Centre.pdf"
            
            onLoadSuccess={this.onDocumentLoadSuccess}
            onLoadError = {this.onDocumentLoadError}>
            
            <Page pageNumber={pageNumber} />
          
      
          </Document>
        </div>
      </div>
    );
  }
}

export default Slideshow




