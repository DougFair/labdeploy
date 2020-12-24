import React, {Component} from 'react'
import axios from 'axios'

class PhotoAddForm extends Component {
    state ={
        file: null,
        id: "",
        uploaded: false,
        type:"",
        displayPage: 1,
      }

componentDidMount (){
    if (this.props.paper) {
    this.setState({id:this.props.paper._id})
    }
    }

 handleChange = (evt) => {
        this.setState({file:evt.target.files[0], type:evt.target.name})
}

handleSubmit = (e) => {
        e.preventDefault() 
        if(!this.state.file){
        alert("You must select a file before submitting")
        } else {
        let url=`http://localhost:3001/photoCreate/${this.state.id}`
          
        let file = this.state.file 
      
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
          axios.put(url, formData, config)
          .then(response => console.log("file uploaded"))
          .then(this.props.handleUpload)
        }
}
      



render (){
    return (
<div>      
    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <div className="uploadForm">
            <label htmlFor="photoUpload">Select a photo to upload to this paper</label>
            <input type="file" id="photoUpload" className="uploadFileInput" name="photo" onChange={this.handleChange}/>
        </div>
        <div className="uploadForm">
            <button type="submit" value="Upload Photo" className="uploadButton">Upload Photo</button>
        </div>
    </form>
</div>   
)}
}

export default PhotoAddForm