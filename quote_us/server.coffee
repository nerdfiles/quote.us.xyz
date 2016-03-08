###*
@fileOverview ./quote_us/server.js
###

http         = require('http')
express     = require('express')
bodyParser  = require('body-parser')
cookieParser = require('cookie-parser')
config = port: process.env['PORT'] or 3001
path = require('path')

server = (app) ->

  app.set 'port', config.port
  app.engine('jade', require('jade').__express)
  app.set('view engine', 'jade')
  app.set('views', path.join(__dirname, '../app'))

  # Configure middleware: Serializer
  app.use bodyParser.json()

  # Configure middleware: Cookies
  app.use cookieParser()

  connectExpressServer = () ->

    ###*
    Initialize Application Server
    ###

    server = http.createServer(app)

  {
    app    : app,
    server : connectExpressServer()
  }


module.exports = server
