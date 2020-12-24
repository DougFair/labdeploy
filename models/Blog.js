const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogTitle: String,
    blogText: String,
    dateCreated: {type:Number, default: Date.now()},
    dateUpdated: Date,
    blogPhotoPath: String,
    blogLink: String
});

module.exports = mongoose.model("Blog", blogSchema);