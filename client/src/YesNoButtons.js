import React from 'react'
import "./YesNoButtons.css"

const YesNoButtons = (props) => {
    return (
        <div className="buttonsContainer">
            <p>Upload another photo for this event?</p>
            <div className="buttons">
                <input type="submit" name="Yes" value="Yes" className="yesbutton" onClick={()=> props.handleConfirm(true)}/>
                <input type="submit" name="No" value="No" className="nobutton" onClick={()=> props.handleConfirm(false)}/>
            </div>
        </div>
    )
}


export default YesNoButtons