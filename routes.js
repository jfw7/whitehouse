"use strict";
const express = require("express");
const request = require("request");
let router = express.Router();
router.get("/", function (req, res, next) {
    request({
        url: "https://api.genius.com/search",
        qs: {
            "q": "Test"
        },
        headers: {
            "Authorization": `Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render("index");
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
