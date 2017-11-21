const db = require("../models");

// Defining methods for the articlesController
module.exports = {
    // writes the new article to the database
    create: function (req, res) {
        db.Article
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

    },
    // finds all saved articles to the database
    findAll: function (req, res) {
        db.Article
            .find(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // removes saved article from the database
    remove: function (req, res) {
        db.Article
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}