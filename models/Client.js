/**
 * Clients.js
 *
 */

var fs = require("fs");
var path = require("path");

var dir_path = "../public/faces";

var clients = new Map();

exports.create = function (id, name, image) {
  return new Promise(function (resolve, reject) {
    var filepath = path.resolve(__dirname, dir_path, id + ".png");

    fs.writeFile(filepath, image, function (err) {
      if (err) {
        return reject(err);
      }

      var data = {
        name: name,
        img_path: "/faces/" + id + ".png"
      };

      clients.set(id, data);

      resolve(data);
    });
  });
};

exports.find = function (id) {
  return clients.get(id);
};

exports.findAll = function () {
  var res = {};

  for (var d of clients.entries()) {
    res[d[0]] = d[1];
  }

  return res;
};

exports._clients = clients;
