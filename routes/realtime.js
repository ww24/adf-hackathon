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

    // 登録処理
    socket.on("register", function (data, done) {
      console.log("register:", data);

      models.Client.create(socket.id, data.name, data.image).then(function (data) {
        console.log(data);

        display.emit("add", {
          id: socket.id,
          name: data.name,
          img_path: data.img_path
        });

        done && done({status: "ok"});
      }).catch(function (err) {
        console.error(err);
        done && done({status: "ng"});
      });
    });

    // tap イベント
    socket.on("tap", function (data) {
      console.log("tap:", data);

      display.emit("tap", {
        id: socket.id
      });
    });

    socket.on("disconnect", function () {
      // disconnected
      console.log("client disconnected:", socket.id);
    });
  });
}

module.exports = realtime;
