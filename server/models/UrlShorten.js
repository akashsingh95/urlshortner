const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlShortenSchema = new Schema({
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now }
});
mongoose.model("UrlShorten", urlShortenSchema);