const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = eventName => {
  return mssql
    .executeProc("Event_Insert", request => {
      request.addParameter("EventName", TYPES.NVarChar, eventName);
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

module.exports = {
  post
};
