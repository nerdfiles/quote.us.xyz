###*
@fileOverview ./quote_us/theme.js
@description
Load quote_us theme.
###

express = require('express')
path = require('path')

themeRouteConfig = (__interface__) ->

  ###*
  Theme Route Config
  @module quote_us.app/theme
  ###

  __interface__.app.use express.static(path.join(__dirname, '../app')) # Use no view engine
  # For static generation of minified files.
  __interface__.app.use '/assets', express.static(path.join(__dirname, '../app'))
  __interface__

module.exports = themeRouteConfig

