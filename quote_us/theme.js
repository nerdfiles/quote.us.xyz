
/**
@fileOverview ./blocknext/theme.js
@description
Load Blocknext theme.
 */

(function() {
  var express, path, themeRouteConfig;

  express = require('express');

  path = require('path');

  themeRouteConfig = function(__interface__) {

    /**
    Theme Route Config
    @module blocknext.app/theme
     */
    __interface__.app.use(express["static"](path.join(__dirname, '../app')));
    __interface__.app.use('/assets', express["static"](path.join(__dirname, '../app')));
    return __interface__;
  };

  module.exports = themeRouteConfig;

}).call(this);
