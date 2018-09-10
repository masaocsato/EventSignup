const router = require("express").Router();

const eventSignupRoutes = require("../routes/eventSignup.routes");

module.exports = router;

router.use("/eventSignup", eventSignupRoutes);
