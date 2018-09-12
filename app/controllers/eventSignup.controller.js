const eventSignupService = require("../services/eventSignup.service");

const post = (req, res) => {
  const { eventName, eventStartDate, eventEndDate, eventDetails } = req.body;
  eventSignupService
    .post(eventName, eventStartDate, eventEndDate, eventDetails)
    .then(result => {
      console.log(result);
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err, "Error from controller");
    });
};

const get = (req, res) => {
  eventSignupService
    .get()
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err, "Error from controller");
    });
};

const put = (req, res) => {
  const {
    eventName,
    eventStartDate,
    eventEndDate,
    eventDetails,
    id
  } = req.body;
  eventSignupService
    .put(eventName, eventStartDate, eventEndDate, eventDetails, id)
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err, "Error from controller");
    });
};

const deleteEvent = (req, res) => {
  const { id } = req.params;
  eventSignupService
    .deleteEvent(id)
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err, "Error from controller");
    });
};

module.exports = {
  post,
  get,
  put,
  deleteEvent
};
