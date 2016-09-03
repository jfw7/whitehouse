"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes_1 = require("./routes");
const sassMiddleware = require("node-sass-middleware");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
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
    }
    routes() {
        this.app.use(routes_1.default);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
