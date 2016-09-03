"use strict";
var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.render("index");
});
router.get("/test", function (req, res, next) {
    res.render("test");
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
