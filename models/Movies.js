const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    movieImage: { data: Buffer, contentType: String },
    rate: { type: Number, required: true },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Movies", movieSchema);