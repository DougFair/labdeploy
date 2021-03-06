const express = require("express");
const mongoose= require('mongoose')
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require('dotenv').config();
var cors = require('cors')
const path = require("path")

app.use(cors())


// Static file pathways when not using Amazon S3
app.use(express.static(__dirname, + "/public"));
app.use("/images",express.static(__dirname, + "/images"));
app.use("/pdf", express.static(__dirname, + "/pdf"));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json())
app.use(methodOverride("_method"));



// Requiring routes
const homeRoutes = require("./routes/home");
const mediaRoutes = require("./routes/media");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/admin")
const siteinfoRoutes = require("./routes/siteinfo")
// app.use("/siteinfo", siteinfoRoutes);
const blogRoutes = require("./routes/blog")
const teamRoutes = require("./routes/team")
const labdocumentRoutes = require("./routes/labdocuments")
const projectRoutes = require("./routes/project")
const labphotoRoutes = require("./routes/pics")


// Using routes
app.use(siteinfoRoutes);
app.use(homeRoutes);
app.use(mediaRoutes);
app.use(searchRoutes);
app.use(adminRoutes);
app.use(blogRoutes);
app.use(teamRoutes);
app.use(labdocumentRoutes);
app.use(projectRoutes);
app.use(labphotoRoutes);


if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

let PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true  })
.then (() =>{
app.listen(PORT, ()=>
    console.log("server has started")
    )
})
.catch ((err) => console.log("error" + err))

