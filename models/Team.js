const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamMemberName: String,
    teamMemberPosition: String,
    teamMemberDescription: String,
    teamMemberPhotoPath: String,
    teamMemberEmail: String,
    rank: Number,
    aspect: String
});

module.exports = mongoose.model("Team", teamSchema);