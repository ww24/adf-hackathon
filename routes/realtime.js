/**
 * Realtime route
 *
 */

var libs = require("../libs");
var models = require("../models");

function realtime(io) {
  var display = io.of("/display");
  display.on("connection", function (socket) {
    // connected
    console.log("display connected:", socket.id);

    socket.on("disconnect", function () {
      // disconnected
      console.log("display disconnected:", socket.id);
    });
  });

  var client = io.of("/client");
  client.on("connection", function (socket) {
    // connected
    console.log("client connected:", socket.id);

    socket.on("disconnect", function () {
      // disconnected
      console.log("client disconnected:", socket.id);
    });
  });
}

module.exports = realtime;
