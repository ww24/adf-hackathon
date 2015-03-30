/**
 * ADF Hackathon
 *
 */

var express = require("express");
var socket = require("socket.io");
var bodyParser = require("body-parser");
var session = require("express-session");
// var MongoStore = require("connect-mongo")(session);
var hogan = require("hogan-express");
var config = require("config");
var path = require("path");
var http = require("http");

var routes = require("./routes");

var app = express();
var server = http.Server(app);
var io = socket(server);

// express settings
app.disable("x-powered-by");
app.set("port", process.env.PORT || config.server.port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", hogan);

// middleware
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.json());
// app.use(session({
//   name: config.session.name,
//   cookie: config.session.cookie,
//   secret: config.session.secret,
//   store: new MongoStore({
//     db: config.db.name,
//     host: config.db.host,
//     port: config.db.port,
//     username: config.db.user,
//     password: config.db.pass
//   }),
//   resave: false,
//   saveUninitialized: true
// }));

// load routes
app.use(routes);
routes.realtime(io);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
      message: err.message,
      error: err
  });
});

process.on("uncaughtException", function (err) {
  console.error(err);
});

server.listen(app.get("port"), function() {
  console.log("Express server listening on " + JSON.stringify(server.address()));
});
