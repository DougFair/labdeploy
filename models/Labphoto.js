const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
    picEvent: String,
    picYear: Number,
    pics: []
});

module.exports = mongoose.model("Pic", picSchema);

// const picSchema = new mongoose.Schema({
//     picEvent: String,
//     picCaption: String,
//     picYear: Number,
//     picPhotoPath: String,
// });