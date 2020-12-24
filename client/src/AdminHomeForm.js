import React from 'react'
import "./AdminHome.css"
import LinkButton from './LinkButton'
import "./LinkButton.css"

const AdminHomeForm = () => {

return (
    <div className="adminHomeContainer">
        <div className="adminHomeHeading">
            <h1 className="adminHomeHeadingItem">Administrator Home Page</h1>
            <p className="adminHomeHeadingItem">This page directs you to where you can create or edit your site and/or blog, and set-up or edit your library.</p>
            <h2>What would you like to do?</h2>
        </div>
        <hr/>

        <h2 className="adminHomeSubHeading">Create or edit a website</h2>
        <p>Set up your website by entering all the basic details you want to display</p>
        
        <div className="adminHomeForm">
            <form name="createSite">
            <LinkButton className="linkButton" to='/adminhome/createsite'>Create website</LinkButton>
            </form>

            <form name="editSite">
            <LinkButton className="linkButton" to='/adminhome/editsite'>Edit website</LinkButton>
            </form>
        </div>
        <hr/>


        <h2 className="adminHomeSubHeading">Create or edit your blog</h2>
        <p>Create a new blog item</p>
        
        <div className="adminHomeForm">
            <form name="createBlogPost">
            <LinkButton className="linkButton" to='/adminhome/createBlogPost'>Create Blog Post</LinkButton>
            </form>

            <form name="editBlog">
            <LinkButton className="linkButton" to='/adminhome/updateBlogPost'>Update / Edit Blog Post</LinkButton>
            </form>

            <form name="deleteBlog">
            <LinkButton className="linkButton" to='/adminhome/deleteBlogPost'>Delete Blog Post</LinkButton>
            </form>
        </div>

        <hr/>

        <h2 className="adminHomeSubHeading">Create a library</h2>
        <p>Add papers by searching PubMed or enter details manually (e.g. for book chapter or articles not indexed by PubMed) </p>
        
        <div className="adminHomeForm">
            <form name="addSearch">
            <LinkButton className="linkButton" to='/adminhome/addpublicationsearch'>Add Publication(s) - Search</LinkButton>
            </form>

            <form name="addManual">
            <LinkButton className="linkButton" to='/adminhome/addpublicationmanual'>Add Publication - Manual</LinkButton>
            </form>
        </div>
        {/* <hr/> */}

        <h2 className="adminHomeSubHeading">Edit your library</h2>
        <p>Editing an article allows you to add details not available through Pubmed such co-first or corresponding authorship, as well as other information such as if it was on the cover of the journal, had a commentary etc. You can also a delete an article from your library.</p>

        <div className="adminHomeForm">
            <form name="update">
            <LinkButton className="linkButton" to='/adminhome/editpublication'>Edit/Update Publication</LinkButton>
            </form>

            <form name="delete">
            <LinkButton className="linkButton" to='/adminhome/deletepublication'>Delete Publication</LinkButton>
            </form>
        </div>

        {/* <hr/> */}

        <h2 className="adminHomeSubHeading">Add media to your library</h2>
        <p>You can add a PDF and/or an image to article. This will both enable visitors to your page to access the PDF (if allowed), but will also provide the image used in your publication gallery.</p>
        
        <div className="adminHomeForm">
            <form name="addMedia">
            <LinkButton className="linkButton" to='/adminhome/addmedia'>Add Media</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/deletemedia'>Delete Media</LinkButton>
            </form>
        </div>
    <hr/>
    <h2 className="adminHomeSubHeading">Your Team</h2>
        <p>You can add info about your team including photos.</p>
        
        <div className="adminHomeForm">
            <form name="addTeamMember">
            <LinkButton className="linkButton" to='/adminhome/createmember'>Add Team Member</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/editmember'>Edit Team Member</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/deletemember'>Delete Team Member</LinkButton>
            </form>
        </div>
        
        <hr/>
        
        <h2 className="adminHomeSubHeading">Your Projects</h2>
        <p>You can add info about your projects including photos.</p>
        
        <div className="adminHomeForm">
            <form name="addTeamMember">
            <LinkButton className="linkButton" to='/adminhome/createproject'>Add a Project</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/editproject'>Edit a Project</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/deleteproject'>Delete a Project</LinkButton>
            </form>
        </div>

        <hr/>
        
        <h2 className="adminHomeSubHeading">Your Lab Documents</h2>
        <p>You can add PDFs for your lab protocols or other documents</p>
        
        <div className="adminHomeForm">
            <form name="addTeamMember">
            <LinkButton className="linkButton" to='/adminhome/createlabdocument'>Add a Document</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/editlabdocument'>Edit a Document</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/deletelabdocument'>Delete a Document</LinkButton>
            </form>
            <hr/>
        </div>
        
        <h2 className="adminHomeSubHeading">Your Lab Photos</h2>
        <p>You can add photos for your lab events or other activities</p>
        
        <div className="adminHomeForm">
            <form name="addTeamMember">
            <LinkButton className="linkButton" to='/adminhome/createlabphoto'>Add a Photo</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/editlabphoto'>Edit a Photo</LinkButton>
            </form>

            <form name="deleteMedia">
            <LinkButton className="linkButton" to='/adminhome/deletelabphoto'>Delete a Photo</LinkButton>
            </form>
        </div>

    </div>
    )
}


export default AdminHomeForm