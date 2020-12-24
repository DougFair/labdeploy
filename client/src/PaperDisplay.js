import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import Modal from './Modal'
import "./paperDisplay.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PaperDisplay extends Component {
  state = {
    pageNumber: 1,
    noteText: "",
    papers: [],
    style: "list",
    order: "recent"
  }
 
componentDidMount (){
    axios.get("http://localhost:3001/displayPapers")
    .then(resp => {
      let sortedPapers = resp.data.sort(function(a, b){return b.year - a.year})
      console.log(sortedPapers)
      this.setState({papers: sortedPapers});
    });
}

handleGalleryChange = (evt) => {
  this.setState({style: evt.target.value})
}

handleOrderChange = (evt) => {
  let newOrder = this.state.papers.reverse()
  this.setState({papers: newOrder, order: evt.target.value})
}

onDocumentLoadError = (error) => {
    console.log("error" + error.message)
}

render() {
let paperShow=""

if(this.state.style === "gallery") {

  if (this.state.papers.length){
  paperShow = this.state.papers.map((paper, idx) => {
    if (paper.pdfPath){ 
      return(
         <React.Fragment key={idx}>
         <div>
            {idx > 0 ? paper.year !== this.state.papers[idx-1].year ? 
            <h2 className="paperYearDiv">{paper.year}</h2>
            : 
            ""
            : 
            <h2 className="paperYearDiv">{paper.year}</h2>
            }
          </div> 

        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
          {/* <div className="paperYear">{paper.year}</div> */}
          <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
                <div className="PaperDisplayBox">
                  <Document
                  file={paper.pdfPath}
                  // onLoadSuccess={this.onDocumentLoadSuccess}
                  onLoadError = {this.onDocumentLoadError}>
                  <Page pageNumber={paper.displayPage || 1} scale={0.38}/>
                  </Document>
                </div>
                <div className="DisplayModal" style={{display:"flex", alignItems: "stretch"}} >
                    <Modal  
                    title={paper.title}
                    id={paper._id}            
                    authors={paper.authors}
                    journal={paper.journal}
                    volume={paper.volume}
                    pages={paper.pages}
                    pmid={paper.pmid}
                    pdfPath={paper.pdfPath}
                    photoPath={pdfjs.photoPath}
                    pdfAvailable={paper.pdfAvailable}
                  />
                </div>
          </div>
        </div>
        </React.Fragment>
    )} 
  })
  } else {
    paperShow = 
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h2>There are currently no PDFs to display</h2>
      <h3>Switch to "List" Display Style in case there are papers without associated PDFs</h3>
    </div>
    }
} else {
  if(this.state.papers.length){
  paperShow = this.state.papers.map((paper,idx) => {
     return (
      <div key={idx} className="eachPaper" style={{marginBottom: "15px"}}>
              <div className="paperDetails">
                <span className="title"> ({idx+1}) </span>
                <span className="title"> {paper.title} </span>
                <span className="authors"> {paper.authors} </span>
                <span className="year">({paper.year})</span>
                <span className="journal" style={{textTransform:"capitalize"}}> {paper.journal}, </span>
                <span className="volume"> {paper.volume}: </span>
                <span className="pages"> {paper.pages}, </span>
                <span className="pmid">PMID: <a href= {`https://www.ncbi.nlm.nih.gov/pubmed/${paper.pmid}`} target="_blank" rel="noopener noreferrer"> {paper.pmid} </a></span>
              </div>
              <div className="paperTypeComments"> 
                  <p className="pdfDisplayRow" style={{fontWeight: "bold"}}>PDF: {'\u00A0'}</p>
                  {!paper.pdfAvailable ? <p style={{margin: 0}}>Not available for download</p> : 
                  <a href={paper.pdfPath}><i id="pdfIcon" className="far fa-file-pdf"></i></a>
                  }
                  {'\u00A0'}{'\u00A0'}{'\u00A0'}
                 <p style={{fontWeight: "bold", margin: 0}}>Article type:</p>{"\u00A0"}{paper.type}
              </div>
              <div>
              {paper.comments ?           
              <div className="paperTypeComments">
                <p style={{margin: 0, fontWeight: "bold"}}>Additional Info:</p>{paper.comments}
              </div>
              : null
              }
              </div>
     </div>

  )})
} else {
  paperShow = 
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h2>There are currently no papers to display</h2>
    </div>
}
}

 return (
    <div className="displayPaperContainer">
      <div className="displayPaperHeading">
      
        <h1 className="heading" style={{color:this.props.publicationPageHeadingColor}}>PUBLICATIONS</h1>
    
      <div className="displaySelectors">
        <div className="displaySelectorUnit">
        <h3 className="displaySelectorHeading">Display Style</h3>
          <div className="radioButtons">
            <form>
            <label htmlFor="listButton">List</label>
              <input type="radio" name="listButton" value="list" onChange={this.handleGalleryChange} checked={this.state.style === "list"} 
              id="listButton"/>
                 
              <input type="radio" name="displayStyle" value="gallery" onChange={this.handleGalleryChange} checked={this.state.style === "gallery"}
              id="galleryButton" 
              />
              <label htmlFor="galleryButton">PDF gallery</label>
            </form>
          </div>
        </div>

        <div className="displaySelectorUnit">
          <h3 className="displaySelectorHeading">Order</h3>
          <div className="radioButtons">
            <form>
              <label htmlFor="galleryButton">Recent First</label>
              <input type="radio" name="order" value="oldest" onChange={this.handleOrderChange} checked={this.state.order === "oldest"} 
              id="listButton"/>
              
              <input type="radio" name="order" value="recent" onChange={this.handleOrderChange} checked={this.state.order=== "recent"}
              id="galleryButton" 
              />
              <label htmlFor="listButton">Oldest First</label>
            </form>
          </div>
          </div>
        </div>
     </div>
      <div className={this.state.style == "list" ? "listStyle" : "galleryStyle"}>
            {paperShow}
      </div>
    </div>
    );
  }
}

export default PaperDisplay



