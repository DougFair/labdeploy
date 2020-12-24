const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema({
    imagePath: String,
    caption: String,
});

module.exports = mongoose.model("Photo", photoSchema);