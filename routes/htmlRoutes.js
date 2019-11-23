// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads register.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/register.html"));
  });

  // Post Route For Register
  app.post("/register", function (req, res) {
    console.log(req.body)
    db.UserInfo.create({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      password: req.body.password
      // Need To Send Results To DatabaseTable UserInfos
    }).then(function (results) {
      res.sendFile(path.join(__dirname, "../views/present.html"));
    });
  });

  // signin route loads signin.html
  app.get("/signin", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/signin.html"));
  });

  // present route loads the present.html page, where users can enter new reminders to the db
  app.get("/present", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/present.html"));
  });

  // future route loads the future.html page, where future reminders in the db are displayed
  app.get("/future", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/future.html"));
  });

  // previous route loads the previous.html page, where previous reminders in the db are displayed
  app.get("/previous", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/previous.html"));
  });

  // add route loads the add.html page, where new reminders are added in the db
  app.get("/addNew", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/addNew.html"));
  });
};
