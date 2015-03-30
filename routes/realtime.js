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

    socket.on("start", function (data) {
      /*
      libs.calc.start(data);
      */
    });

    // メッシュ情報更新
    socket.on("update", function (data) {
      libs.calc.update(data);

      var clients = models.Client._clients;
      var id, d;
      for (var c of clients) {
        id = c[0];
        d = c[1];
        client.to(id).emit("update", {
          score: 50,//debug
          vibrate: 1500//sec
        });
      }
    });

    socket.on("end", function () {
      client.sockets.emit("end");
    });

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
    socket.on("register", function (data) {
      console.log("register:", data);

      models.Client.create(socket.id, data.name, data.image).then(function (data) {
        console.log(data);
      }).catch(function (err) {
        console.error(err);
      });
    });

    // tap イベント
    socket.on("tap", function (data) {
      console.log("tap:", data);

    });

    socket.on("disconnect", function () {
      // disconnected
      console.log("client disconnected:", socket.id);
    });
  });
}

module.exports = realtime;
