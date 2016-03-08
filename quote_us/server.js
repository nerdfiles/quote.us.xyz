
/**
@fileOverview ./blocknext/server.js
 */

(function() {
  var bodyParser, config, cookieParser, express, http, path, server;

  http = require('http');

  express = require('express');

  bodyParser = require('body-parser');

  cookieParser = require('cookie-parser');

  config = {
    port: process.env['PORT'] || 3001
  };

  path = require('path');

  server = function(app) {
    var connectExpressServer;
    app.set('port', config.port);
    app.engine('jade', require('jade').__express);
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '../app'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    connectExpressServer = function() {

      /**
      Initialize Application Server
       */
      return server = http.createServer(app);
    };
    return {
      app: app,
      server: connectExpressServer()
    };
  };

  module.exports = server;

}).call(this);
