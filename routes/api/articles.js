const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/saved-articles"
router.route("/")
    .get(articlesController.findAll)
    .post(articlesController.create);

// Matches with "/api/saved-articles/:id"
router
    .route("/:id")
    .delete(articlesController.remove);

module.exports = router;
