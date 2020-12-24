import React, {Component} from 'react'
import "./labphotos.css"
import axios from 'axios'

class LabDocuments extends Component {

state ={
    pics: [],
    }

componentDidMount (){
        axios.get("http://localhost:3001/pics")
        .then(response => {
            let sortedResponse = response.data.sort(function(a, b){return b.picYear - a.picYear})
            this.setState({pics: sortedResponse}) 
        })
    }


render() {
    let pageDisplay = ""
    if (this.state.pics.length){
        
        pageDisplay =this.state.pics.map((pic, idx) => 

        <div key={pic._id} className="pageContainer">
            
            <div className="eventYearContainer">
                <div>
                {idx > 0 ? pic.picYear !== this.state.pics[idx-1].picYear ?
                <h2 className="picYear">{pic.picYear}</h2> : null : <h2 className="picYear">{pic.picYear}</h2>}
                </div>
                <h3 className="picEvent" style={{color: this.props.photoHeadingColor}}>{pic.picEvent}</h3>
                </div>
            <div  className="photoCaptionContainer">
                {pic.pics.map(photo => {
                return(
                    <div className="photoPlusCaption">
                        <img src={photo.picPhotoPath} className={photo.aspect} alt="lab pic"/>
                        <p className="picCaption">{photo.picCaption}</p>
                    </div>
                )
                })
                }
             </div>   
        </div>
    )} else {
        pageDisplay = <h3 className="noPhotoMessage">There are currently no lab photos</h3>
    }
 
      return (
        <div>
            <h1 className="titlePhotos" style={{color: this.props.photoPageHeadingColor}}>Lab Photos</h1>
            {pageDisplay}
        </div> 
     )
    }
}
export default LabDocuments