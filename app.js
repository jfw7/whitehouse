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
        this.app.set("view engine", "pug");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this.app.use("/public", function (req, res, next) {
            req.url = req.url.replace(/\/([^\/]+)\.[0-9a-f]+\.(css|js|jpg|png|gif|svg)$/, "/$1.$2");
            next();
        });
        this.app.use("/public/styles", sassMiddleware({
            src: path.join(__dirname, "sass"),
            dest: path.join(__dirname, "public/styles"),
            debug: true,
            outputStyle: "compressed",
        }));
    }
    routes() {
        this.app.use(routes_1.default);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
