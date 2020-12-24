import React from 'react'
import {Link} from 'react-router-dom'
import './Toolbar.css'

const Toolbar = (props) => {

    return (
        <nav className="nav" style={{backgroundColor: props.menuBarColor || "black"}}>
            <div>
                <Link to="/" className="link" style={{color: props.menuBarTextColor || "white"}}>Home</Link>
                <Link to="/pubsgallery" className="link" style={{color: props.menuBarTextColor || "white"}}>Publications</Link>
                <Link to="/team" className="link" style={{color: props.menuBarTextColor || "white"}}>People</Link>
                <Link to="/projects" className="link" style={{color: props.menuBarTextColor || "white"}}>Projects</Link>
                <Link to="/photos" className="link" style={{color: props.menuBarTextColor || "white"}}>Photos</Link>
            </div>
            <div>
                <Link to="/labdocuments" className="link" style={{color: props.menuBarTextColor}}>Documents</Link>
                <Link to="/admin/home" className="link" style={{color: props.menuBarTextColor}}>Admin</Link>
                <Link to="/contact" className="link" style={{color: props.menuBarTextColor}}>Contact</Link>
            </div>
        </nav>
      );
}
 
export default Toolbar;