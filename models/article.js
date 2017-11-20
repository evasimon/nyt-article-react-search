const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creates the Article Schema and model 
const articleSchema = new Schema({
    title: { type: String, required: true }, // Title of the stored article from nytimes.com
    date: { type: Date, default: Date.now }, // publish date and time of the article
    url: { type: String, required: true }   // URL of the article on nytimes.com
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;