const eventSignupService = require("../services/eventSignup.service");

const post = (req, res) => {
  const { eventName } = req.body;
  eventSignupService
    .post(eventName)
    .then(response => {
      console.log(response);
    })
    .then(Id => {
      res.status(201).json(Id);
    });
};

module.exports = {
  post
};
