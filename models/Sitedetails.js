const mongoose = require("mongoose");

const sitedetailsSchema = new mongoose.Schema({
    labName: String,
    labNameColor: {type: String, default: "Black"},
    labNameSize: {type: String, default: "3"},
    labSubheading: String,
    labSubheadingColor: {type: String, default: "Black"},
    labSubheadingSize: {type: String, default: "2"},
    labMinorheading: String,
    labMinorheadingSize: {type: String, default: "1.5"},
    labMinorheadingColor: {type: String, default: "Black"},
    menuBarColor: {type: String, default: "Black"}, 
    menuBarTextColor: {type: String, default: "White"},
    labDescription: String,
    labDescriptionColor: {type: String, default: "Black"},
    labDescriptionBkdColor: {type: String, default: "White"},
    bannerPhotoPath: String,
    blogHeading:{type: String, default: "Lab News"},
    blogHeadingColor:{type: String, default: "Black"},
    blogPostHeadingColor:{type: String, default: "Black"},
    publicationPageHeadingColor:{type: String, default: "Black"},
    projectPageHeadingColor:{type: String, default: "Black"},
    projectHeadingColor:{type: String, default: "Black"},
    peoplePageHeadingColor:{type: String, default: "Black"},
    peopleHeadingColor:{type: String, default: "Black"},
    photoPageHeadingColor:{type: String, default: "Black"},
    photoHeadingColor:{type: String, default: "Black"},
    themeColor: {type: String, default: "Black"},
});

module.exports = mongoose.model("Sitedetails", sitedetailsSchema);