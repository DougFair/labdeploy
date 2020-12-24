const mongoose = require("mongoose");

const labDocumentSchema = new mongoose.Schema({
    documentName: String,
    documentCategory: String,
    documentPreparedBy: String,
    documentFilePath: String,
});

module.exports = mongoose.model("Labdocument", labDocumentSchema);