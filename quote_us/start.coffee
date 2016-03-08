###*
@fileOverview ./quote_us/start.js
@description
Start Web application.
###

start = (__interface__) ->

  ###*
  Server initialization at a specified port.
  @module quote_us.app/start
  ###

  port = __interface__.app.get('port')
  __interface__.server.listen port, ->
    loadedPort = __interface__.server.address().port
    logo = []
    console.log logo.join('\n')
    console.log 'Running on http://localhost:' + loadedPort
    return
  return

module.exports = start
