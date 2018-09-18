const scraperController = require("../controllers/scraper.controller");
const router = require("express").Router();

module.exports = router;

router.post("/", scraperController.post);
