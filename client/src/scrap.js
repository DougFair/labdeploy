handleForm = (evt) => {
    console.log("powewe")
    let title = evt.target.value
    console.log("title" + title)
    if(this.state.selectedPapers.length) {
        console.log("po")
        this.state.selectedPapers.map(paper => {
            console.log("yes")
            if(paper.title === title) {
                console.log("match")
                this.setState(st => ({selectedPapers: st.selectedPapers.filter(paper => paper.title !== title)}), 
            )} else {
                this.state.allPapers.map(paper => {
                    console.log("yesdasdsasda")
                    if(paper.title === title) {
                    this.setState({selectedPapers: [...this.state.selectedPapers,paper]})
                }})}
            
        })
        }  else  {
            console.log("no")
                this.state.allPapers.map(paper => {
                if(paper.title === title) {
                this.setState({selectedPapers: [...this.state.selectedPapers,paper]})
            }})
        }
    } 