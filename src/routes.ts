/// <reference path="./_all.d.ts" />
"use strict";

import * as express from "express";
let router: express.Router = express.Router();

router.get("/", function(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.render("index");
});

export default router;
