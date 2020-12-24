const mongoose = require("mongoose");

const pdfFileSchema = new mongoose.Schema({
    title: String,
    authors: String,
    journal: String,
    year: Number,
    volume: String,
    pages: String,
    type: String, 
    doi: String,
    pmid: Number,
    type: {type: String, default: "Primary"},
    pdfPath: String,
    pdfPathFirstPage: String,
    photoPath: String,
    fileName: String,
    comments: String,
    pdfImage: String,
    pdfAvailable: {type: Boolean, default: false},
    displayPage: {type: Number, default: 1}
});

module.exports = mongoose.model("PDFfile", pdfFileSchema);