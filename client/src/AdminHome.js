import React, {Component} from 'react'
import AdminHomeForm from './AdminHomeForm'
import AddPaperSearch from './AddPaperSearch'
import AddPaperManual from './AddPaperManual'
import UpdatePaper from './UpdatePaper'
import DeletePaper from './DeletePaper'
import AddMedia from './AddMedia'
import DeleteMedia from './DeleteMedia'
import {Route, Switch} from 'react-router-dom'

// import AddMedia from './AddMedia'


class AdminHome extends Component {
    state = {
        selection: "none",
        idlist: [],
        papersList: []
    }


handlePaperForm = (selection) => {
    this.setState({selection});
}


render () {
    const {selection} = this.state
    let displayPage = ""
    if (selection !== "none") {
        if(selection === "addSearch") {
        displayPage = 
        <AddPaperSearch
        />
        }
        if(selection === "update") {
            displayPage = 
        <UpdatePaper />
        }
        if(selection === "delete") {
            displayPage = 
        <DeletePaper />
        } 
        if (selection === "addManual") {
            displayPage = 
        <AddPaperManual 
        />
        }
        if (selection === "addMedia") {
        displayPage = 
        <Route exact route ="/adminhome/addmedia" render={routeParams => 
        <AddMedia {...routeParams}/>
        }
        />
        } 

        if (selection === "deleteMedia") {
            displayPage = 
            <DeleteMedia />
        } 
    } else {
        
        displayPage = <AdminHomeForm 
        handlePaperForm = {this.handlePaperForm}
        />
    }

return (
    <Switch>
    {displayPage}
    </Switch>
    )
}
} 

export default AdminHome
