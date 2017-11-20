import axios from "axios";
const baseUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="
const apiKey = "8e99b992c8bf4e65adc4c55b111897e5";

export default {

    // searches for articles from www.nytimes.com
    search: function (query) {
        return axios.get(baseUrl + query + "&api-key=" + apiKey)
    },
    // gets all articles
    getArticles: function () {
        return axios.get("/api/saved");
    },
    // // Gets the book with the given id
    // getBook: function (id) {
    //     return axios.get("/api/books/" + id);
    // },
    // Deletes the book with the given id
    deleteArticle: function (id) {
        return axios.delete("/api/saved/" + id);
    },
    // Saves an article to the database
    saveArticle: function (articleData) {
        return axios.post("/api/saved", articleData);
    }
};