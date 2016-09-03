/// <reference path="_all.d.ts" />
"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import router from "./routes";
import * as sassMiddleware from "node-sass-middleware";

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //configure routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   * @return void
   */
  private config() {
    //configure jade
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "jade");

    //mount logger
    //this.app.use(logger("dev"));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.static(path.join(__dirname, "bower_components")));

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    this.app.use(sassMiddleware({
      src: __dirname,
      dest: path.join(__dirname, "public"),
      debug: true,
      outputStyle: "compressed",
      prefix:  "/prefix"  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    }));

  }

  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    //use router middleware
    this.app.use(router);
  }
}


var server = Server.bootstrap();
export = server.app;
