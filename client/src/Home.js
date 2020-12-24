import React from 'react'
import './Home.css'

const Home = (props) => {
    let styleHead= {}
    if (props.labdetails.labNameColor) styleHead.color = props.labdetails.labNameColor 
    if (props.labdetails.labNameSize) styleHead.fontSize = `${props.labdetails.labNameSize}rem` 

    let styleSubHead= {}
    if (props.labdetails.labSubheadingColor) styleSubHead.color = props.labdetails.labSubheadingColor 
    if (props.labdetails.labSubheadingSize) styleSubHead.fontSize = `${props.labdetails.labSubheadingSize}rem`

    let styleMinorHead= {}
    if (props.labdetails.labMinorheadingColor) styleMinorHead.color = props.labdetails.labMinorheadingColor 
    if (props.labdetails.labSubheadingSize) styleMinorHead.fontSize = `${props.labdetails.labMinorheadingSize}rem`
          
    let styleDescriptBkd= {}
    if (props.labdetails.labDescriptionBkdColor) styleDescriptBkd.backgroundColor = props.labdetails.labDescriptionBkdColor 
  
    let styleDescriptText= {}
    if (props.labdetails.labDescriptionColor) styleDescriptText.color = props.labdetails.labDescriptionColor 

    return(
        <div className="homeContainer">
            <div className="banner">
                    <h1 className="bannerTitle" style={styleHead}>{props.labdetails.labName}</h1>
                    {props.labdetails.labSubheading && <p className="bannerSubheading" style={styleSubHead}>{props.labdetails.labSubheading}</p>}
                    {props.labdetails.labMinorheading && <p className="bannerMinorheading" style={styleMinorHead}>{props.labdetails.labMinorheading}</p>}

                    <div className="labDescription" >
                        <p className="labDescriptionText" style={styleDescriptText}>{props.labdetails.labDescription}</p>
                    </div>

                    <img className="bannerPhoto" src="/laboratories2193.jpg" style={{ marginBottom: "20px"}}/>
            </div>
    
        </div>
        
    )

}

export default Home