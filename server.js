require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Syncing our sequelize models Starting our Express app
// =============================================================
async function startup() {
  const dbOutput = await db.sequelize.sync(syncOptions);
  console.log("----------------------------");
  console.log("DATABASE SERVER CONNECTED");
  console.group("DATABASE CONFIG");
  console.table(dbOutput.config);
  console.groupEnd();

  console.group("DATABASE OPTIONS");
  console.table(dbOutput.options);
  console.groupEnd();

  await app.listen(PORT);
  console.log("----------------------------");
  console.log(`WEB SERVER LISTENING ON: http://localhost:${PORT}`);
}

startup();

module.exports = app;
