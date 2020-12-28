import React, {Component} from 'react'
import "./addMedia.css"
import axios from 'axios'
import moment from 'moment'
import './blogs.css'

class Blogs extends Component {

state ={
    blogs: []
      }

componentDidMount (){
        axios.get("/blogPosts")
        .then(response => {
        let sortedResponse = response.data.sort(function(a, b){return b.dateCreated - a.dateCreated})
        this.setState({blogs: sortedResponse}) 
        })}


render() {
    let pageDisplay=this.state.blogs.map(blog => {
        return(
    <div key={blog._id}>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "flex-start"}}>
        <h3 className="blogTitle" style={{color:this.props.blogPostHeadingColor}}>{blog.blogTitle}</h3>
        <p className="blogDate"> Posted: {blog.dateUpdated ? moment(blog.dateUpdated).format("MMMM Do, YYYY") : moment(blog.dateCreated).format("MMMM Do, YYYY")}</p>
        </div>
        
        <div className="textImage">
            {blog.blogPhotoPath ? 
            <img src={blog.blogPhotoPath} className="blogImage" alt="blog pic" />
            : null
            }
            <div className="blogTextPlusLink">
                <p className="blogText">{blog.blogText}</p>
                {blog.blogLink ? 
                <a href={blog.blogLink} className="linkURL">Link</a>
                : null
                }
            </div>
        </div>

        {/* <div className="blogLinkDisplay" >

        </div> */}
        <hr/>
    </div>
    )})
      return (
        <div className="blogContainer">
            <h1 className="blogHeading" style={{color:this.props.blogHeadingColor}}>{this.props.blogHeading}</h1>
            {pageDisplay}
        </div> 
     )
    }
}
export default Blogs


    