import axios from "axios";
const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
const apiKey = "8e99b992c8bf4e65adc4c55b111897e5";

export default {

    // searches for articles from www.nytimes.com
    search: function (query, startYear, endYear) {
        const startDate = startYear !== "" ? `&begin_date=${startYear}0101` : "";
        const endDate = endYear !== "" ? `&end_date=${endYear}1231` : "";

        return axios.get(`${baseUrl}${query}${startDate}${endDate}&api-key=${apiKey}`)
    },
    // gets all saved articles
    getArticles: function () {
        return axios.get("/api/saved-articles");
    },
    // deletes the saved article with the given id
    deleteArticle: function (id) {
        return axios.delete("/api/saved-articles/" + id);
    },
    // saves an article to the database
    saveArticle: function (articleData) {
        return axios.post("/api/saved-articles", articleData);
    }
};