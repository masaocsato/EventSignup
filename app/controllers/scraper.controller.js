const scraperService = require("../services/eventSignup.service");

const post = (req, res) => {
  const { title, author, url, pic } = req.body;
};
scraperService
  .post(title, author, url, pic)
  .then(result => {
    console.log(result);
    res.status(201).send(result);
  })
  .catch(err => {
    console.log(err, "Error from controller");
  });

module.exports = {
  post
};
