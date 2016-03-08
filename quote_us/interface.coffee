###*
@fileOverview ./quote_us/interface.js
###

module.exports = (__interface__) ->

  #try
     #_interface__.app.use __interface__.allowCrossDomain
  #catch e
    #console.log e

  try
    indexRoute = new require('./modules/home/index')(__interface__.app)
  catch e
    console.log e

  __interface__
