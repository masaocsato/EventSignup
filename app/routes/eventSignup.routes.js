const eventSignupController = require("../controllers/eventSignup.controller");
const router = require("express").Router();

module.exports = router;

router.post("/", eventSignupController.post);
router.get("/", eventSignupController.get);
router.put("/", eventSignupController.put);
