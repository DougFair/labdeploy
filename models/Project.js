const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectTitle: String,
    projectDescription: String,
    projectPhotoPath: String,
    projectFunding: String
});

module.exports = mongoose.model("Project", projectSchema);