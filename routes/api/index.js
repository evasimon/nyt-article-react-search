const router = require("express").Router();
const articleRoutes = require("./articles");

// article routes
router.use("/saved-articles", articleRoutes);

module.exports = router;