const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = (title, author, url, pic) => {
  return mssql
    .executeProc("Scraper_Insert", request => {
      request.addParameter("Title", TYPES.NVarChar, title);
      request.addParameter("Author", TYPES.NVarChar, author);
      request.addParameter("Url", TYPES.NVarChar, url);
      request.addParameter("Pic", TYEPS.NVarChar, pic);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      const item = { scraperId: response.outputParameters.Id };
      console.log(response, "service then");
      return item;
    })
    .catch(err => {
      console.log(err);
    });
};
