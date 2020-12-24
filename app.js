const express = require("express");
const mongoose= require('mongoose')
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require('dotenv').config();
var cors = require('cors')

 
app.use(cors())
// Requiring models
const Photo = require("./models/Photo.js");
const PDFfile = require("./models/PDFfile.js");

// const upload = require('./imageUpload');

// Requiring routes
const homeRoutes = require("./routes/home");
const mediaRoutes = require("./routes/media");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/admin")
const siteRoutes = require("./routes/siteInfo")
const blogRoutes = require("./routes/blog")
const teamRoutes = require("./routes/team")
const labdocumentRoutes = require("./routes/labdocuments")
const projectRoutes = require("./routes/project")
const labphotoRoutes = require("./routes/pics")

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json())
app.use(methodOverride("_method"));

// Static file pathways when not using Amazon S3
app.use(express.static(__dirname, + "/public"));
app.use("/images",express.static(__dirname, + "/images"));
app.use("/pdf", express.static(__dirname, + "/pdf"));

app.set("view engine", "ejs");

// Using routes
app.use(homeRoutes);
app.use(mediaRoutes);
app.use(searchRoutes);
app.use(adminRoutes);
app.use(siteRoutes);
app.use(blogRoutes);
app.use(teamRoutes);
app.use(labdocumentRoutes);
app.use(projectRoutes);
app.use(labphotoRoutes);

app.use(express.static(path.join(__dirname, "client", "build"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



let PORT = process.env.PORT || 3001

mongoose.connect("mongodb+srv://doug:Clone13!@publications-1hgx7.mongodb.net/publications?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true  })
.then (() =>{
app.listen(PORT, ()=>
    console.log("server has started")
    )
})
.catch ((err) => console.log("error" + err))

