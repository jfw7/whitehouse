/// <reference path="./_all.d.ts" />
"use strict";

import * as express from "express";
import * as request from "request";
import * as http from "http";


let router: express.Router = express.Router();

router.get("/", function(req: express.Request, res: express.Response, next: express.NextFunction) {
  request(
    {
      url: "https://api.genius.com/search",
      qs: {
        "q": "Test"
      },
      headers: {
        "Authorization": `Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`
      }
    },
    function(err: any, response: http.IncomingMessage, body: any) {
      console.log(body);
    }
  );
  res.render("index");
});

export default router;
