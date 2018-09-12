const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = (eventName, eventStartDate, eventEndDate, eventDetails) => {
  return mssql
    .executeProc("Event_Insert", request => {
      request.addParameter("EventName", TYPES.NVarChar, eventName);
      request.addParameter("EventStartDate", TYPES.NVarChar, eventStartDate);
      request.addParameter("EventEndDate", TYPES.NVarChar, eventEndDate);
      request.addParameter("EventDetails", TYPES.NVarChar, eventDetails);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      const item = { eventId: response.outputParameters.Id };
      console.log(response, "service then");
      return item;
    })
    .catch(err => {
      console.log(err);
    });
};

const get = () => {
  return mssql
    .executeProc("Event_SelectAll")
    .then(response => {
      // const item = response.data.resultSets[0];
      // console.log(item, "service then");
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const put = (eventName, eventStartDate, eventEndDate, eventDetails, id) => {
  return mssql
    .executeProc("Event_Update", request => {
      request.addParameter("EventName", TYPES.NVarChar, eventName);
      request.addParameter("EventStartDate", TYPES.NVarChar, eventStartDate);
      request.addParameter("EventEndDate", TYPES.NVarChar, eventEndDate);
      request.addParameter("EventDetails", TYPES.NVarChar, eventDetails);
      request.addParameter("Id", TYPES.NVarChar, id);
    })
    .then(response => {
      const item = { eventId: response.outputParameters.Id };
      console.log(response, "service then");
      return item;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  post,
  get
};
