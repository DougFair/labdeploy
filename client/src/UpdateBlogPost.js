import React, {Component} from 'react'
import "./createBlogPost.css"
import axios from 'axios'
import moment from 'moment'
import UpdateBlogPostForm from "./UpdateBlogPostForm" 

class UpdateBlotPost extends Component {
    state = {
        blogPosts: [],
        selectedPost: ""
    }

componentDidMount () {
    axios.get("http://localhost:3001/blogPosts")
    .then(response => this.setState({blogPosts: [...response.data]}))
}

handleChange = (evt) => {
    this.state.blogPosts.forEach(post => {
    if (post._id === evt.target.value) {
    this.setState({selectedPost: post})
    }})
}


render(){
    let pageDisplay = ""
    if (!this.state.blogPosts.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No blog posts to update - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.blogPosts.length && !this.state.selectedPost){
    pageDisplay =  this.state.blogPosts.map(post=> {
    return(
        <div key={post._id} className="deleteBlogItem">
            <input type="checkbox" onChange={this.handleChange} checked={false} name={post.blogTitle} value={post._id}/>
            <p style={{fontWeight: "bold"}}>{post.blogTitle}</p>
            <p>{"\u00A0"} - {post.dateUpdated ? moment(post.dateUpdated).format("MMMM Do, YYYY") : moment(post.dateCreated).format("MMMM Do, YYYY")}</p>
        </div>
    )})
    } else if (this.state.selectedPost){
        pageDisplay =
        <UpdateBlogPostForm 
        selectedPost = {this.state.selectedPost}
        />
    }

    return (
        <div className="deleteBlogPostContainer">  
            <h1 className="titleHead">Edit A Blog Post</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div>
    )
}



}
export default UpdateBlotPost