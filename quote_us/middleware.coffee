###*
@fileOverview ./quote_us/caps.js
@description
1. Documentation  
2. API Mocks
###

express = require('express')
path = require('path')

middlewareConfig = (__interface__) ->

  ###*
  Dev Route Config
  @module quote_us.app/dev
  ###

  # API Documentation
  #__interface__.app.use '/docs/api', express.static(path.join(__dirname, '../docs'))
  # JavaScript Documentation
  #__interface__.app.use '/docs/src', express.static(path.join(__dirname, '../src'))
  # Static Code Analysis
  #__interface__.app.use '/docs/analysis', express.static(path.join(__dirname, '../analysis'))

  # Mocha for Unit Testing Reports in a Web Browser
  #__interface__.app.use '/test/unit', express.static(path.join(__dirname, '../mochawesome-reports'))

  # Karma Runner for E2E Testing Coverage in a Web Browser
  #__interface__.app.use '/test/coverage', express.static(path.join(__dirname, '../test/coverage/PhantomJS\ 1.9.8\ (Mac\ OS\ X\ 0.0.0)'))
  # Karma Runner for E2E Testing in a Web Browser
  #__interface__.app.use '/test/e2e', express.static(path.join(__dirname, '../test'))
  __interface__.app.use '/bower_components', express.static(path.join(__dirname, '../bower_components'))

  # Versioned API Mocks
  #__interface__.app.use '/api/mocks/v1/', express.static(path.join(__dirname, './mocks/v1'))
  __interface__

module.exports = middlewareConfig


