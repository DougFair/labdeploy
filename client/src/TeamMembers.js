import React, {Component} from 'react'
import "./teamMembers.css"
import axios from 'axios'

class TeamMembers extends Component {
imgEl = React.createRef()
state ={
    team: [],
      }

componentDidMount (){
    axios.get("http://localhost:3001/teamMembers")
    .then(response => {
    let sortedResponse = response.data.sort(function(a, b){return a.rank - b.rank})
    // // console.log("team" + JSON.stringify(sortedResponse)
    // sortedResponse.forEach(member => {
    //     let img = new Image()
    //     img.onload = ()=> {
    //         let height = img.height
    //         let width = img.width
    //         if(width > height) {
    //             member.aspect = "landscape"
    //         } else {
    //             member.aspect = "portrait"
    //         }
    //     }
    //     img.src = member.teamMemberPhotoPath
        this.setState({team: sortedResponse})
    })
}




render() {
  
    let pageDisplay = ""

    if (this.state.team.length){
        pageDisplay=this.state.team.map(person => {
return(
    <div key={person._id} className="person">
        <div className="titleHead">
        <h4 style={{color:this.props.peopleHeadingColor}}>{person.teamMemberName}</h4>
        <p>{"\u00A0"} - {person.teamMemberPosition}</p>
        </div>
         <div className="image">
            {person.teamMemberPhotoPath && person.aspect ? 
            
            <img 
            name={person.id}  
            src={person.teamMemberPhotoPath}   

            className={person.aspect}
            alt="team member pic"
            />
            : null
            }
        </div>
        {person.teamMemberEmail ?
            <p className="contactDetails">Contact: {person.teamMemberEmail}</p>
            : null
        }
        <hr className="teamMemberHR"/>
    </div>
    )})
    } else {
        pageDisplay = <h3>There are currently no details for lab members</h3>
    }

      return (
        <div className="teamContainer">
            <h1 style={{color:this.props.peoplePageHeadingColor}}>The Team</h1>
            {pageDisplay}
        </div> 
     )
    }
}
export default TeamMembers