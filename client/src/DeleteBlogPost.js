import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import "./deleteBlogPost.css"
import axios from 'axios'

class DeleteBlotPost extends Component {
    state = {
        blogPosts: [],
        deleted: false
    }

componentDidMount () {
    axios.get("http://localhost:3001/blogPosts")
    .then(response => this.setState({blogPosts: [...response.data]}))
}

handleChange = (evt) => {
    let check = window.confirm(`Are you sure you want to delete "${evt.target.name}"`)
    if (check) {
        this.state.blogPosts.forEach(blog => {
            if(blog._id === evt.target.value) {
            axios.delete(`http://localhost:3001/deleteBlogPost/${blog._id}`)
            .then(response => {
                if(response.data === "deleted"){
                    if (blog.blogPhotoPath){
                    axios.post(`http://localhost:3001/blogphotodelete/${blog.blogPhotoPath.slice(56)}`, {id: this.state._id})
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


render(){
    let pageDisplay = ""
    if (!this.state.blogPosts.length) {
        pageDisplay =
        <div className="noItemsReturn">
            <h3>No blog posts to delete - Return to Admin</h3>
            <button className="backButton" onClick={()=>this.props.history.push("/admin/home")}><i id="caret" className="fas fa-caret-left"></i> {"\u00A0"}{"\u00A0"}Return</button>
        </div>
    } else if (this.state.blogPosts.length && !this.state.deleted){
    pageDisplay =  this.state.blogPosts.map(post=> {
    return(
        <div key={post._id} className="deleteBlogItem">
            <input type="checkbox" onChange={this.handleChange} checked={false} name={post.blogTitle} value={post._id}/>
            <p style={{fontWeight: "bold"}}>{post.blogTitle}</p>
            <p>{"\u00A0"} - {post.dateCreated}</p>
        </div>
    )})
    } else if (this.state.deleted){
        pageDisplay = <Redirect to="/admin/home"/>
    }


    return (
        <div className="deleteBlogPostContainer">  
            <h1 className="titleHead">Delete A Blog Post</h1>
            <div className="listContainer">
                {pageDisplay}
            </div>
        </div>
    )
}

}
export default DeleteBlotPost