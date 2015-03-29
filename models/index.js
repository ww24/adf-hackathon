/**
 * Model
 *
 */

var mongoose = require("mongoose");
var loader = require("../libs/loader");
var config = require("config");
var url = require("url");

var options = {
  protocol: "mongodb",
  slashes: true,
  port: config.db.port,
  hostname: config.db.host,
  pathname: config.db.name
};

if (config.db.user && config.db.pass) {
  options.auth = [config.db.user, config.db.pass].join(":");
}

var mongo_url = url.format(options);

// create MongoDB connection
mongoose.connect(mongo_url);

module.exports = loader(__dirname);
