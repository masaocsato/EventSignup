const eventSignupService = require("../services/eventSignup.service");

const post = (req, res) => {
  const { eventName } = req.body;
  eventSignupService
    .post(eventName)
    .then(result => {
      console.log(result);
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err, "Error from controller");
    });
};

module.exports = {
  post
};
