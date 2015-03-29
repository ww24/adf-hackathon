/**
 * Index router
 *
 */

var express = require("express");
var router = express.Router();
var config = require("config");

var libs = require("../libs");
var models = require("../models");
var routes = libs.loader(__dirname);

// top page
router.get("/", function (req, res) {
  res.locals.template = "index";
  res.render(res.locals.template);
});

// catch 404
router.use(function (req, res) {
  res.status(404).send("Not Found");
});

module.exports = router;
