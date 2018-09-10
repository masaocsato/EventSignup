const eventSignupController = require("../controllers/eventSignup.controller");
const router = require("express").Router();

module.exports = router;

router.post("/", eventSignupController.post);
