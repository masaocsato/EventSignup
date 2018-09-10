const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./app/routes");
const dotenv = require("dotenv"); // Stored config constants in .env file

const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("", routes);

app.use((req, res) => {
  res.status(404).send(`<h2>The path ${req.url} not found.</h2>`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
