const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = eventName => {
  return mssql.executeProc("Event_Insert", request => {
    request.addParameter("EventName", TYPES.NVarChar, eventName);
  });
};

module.exports = {
  post
};
