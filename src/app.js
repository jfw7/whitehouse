"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var routes_1 = require("./routes");
var sassMiddleware = require("node-sass-middleware");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this.app.use(sassMiddleware({
            src: __dirname,
            dest: path.join(__dirname, "public"),
            debug: true,
            outputStyle: "compressed",
            prefix: "/prefix"
        }));
    };
    Server.prototype.routes = function () {
        this.app.use(routes_1.default);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
