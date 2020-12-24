import React from 'react'
import "./modal.css"

const Modal = (props) => {

    return (
        <div className="modalBox">
            
            <p className="modalPaperTitle">{props.title}</p>
            <p className="modalPaperInfo">Authors: {props.authors}</p>
            <p className="modalPaperInfo">Journal: {props.journal}</p>
            <p className="modalPaperInfo">Volume/Pages: {props.volume}: {props.pages}</p>
            <div className="modalRow">
                <p className="modalPaperInfoRow">PMID: {'\u00A0'}</p>
                <a className="modalPaperInfoRow" href={`https://www.ncbi.nlm.nih.gov/pubmed/${props.pmid}`} target="_blank" rel="noopener noreferrer">{props.pmid}.</a>
            </div>
            {props.pdfPath && 
            <div className="modalRow">
                <p className="modalPaperInfoRow">PDF: {'\u00A0'}</p>
                {!props.pdfAvailable ? <p className="modalPaperInfo">Not available for download</p> : 
                <a href={props.pdfPath}><i id="pdfIconGallery" className="far fa-file-pdf"></i></a>
                }
            </div>
            }
        </div>
    )
}

export default Modal