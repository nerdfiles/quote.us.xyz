###*
@fileOverview ./APP/modules/Home/index.js
###

fs = require('fs')
path = require('path')
Product = require('../../services/product')

homeRoute = (app) ->

  app.get '/api/v1/book/ideas', (req, outerRes, next) ->
    Product().then((results) ->
      outerRes.json results
    )

  app.get '/api/v1/:id', (req, outerRes, next) ->
    id = req.params.id or '3513305'
    mockProperty = '/mocks/Property-'+id+'.json'

    fs.readFile(path.join(__dirname, '..', '..', mockProperty), 'utf-8', (err, data) ->
      if err
        throw err
      content = data

      processFile(content)
    )

    processFile = (_content, _results) ->
      __content = JSON.parse(_content)
      streetAddressContext = __content[1][0].split(' ')
      num = __content[1][18].split('$')[1].split(',')
      priceContext = parseInt(num.join(''), 10)
      y = []
      for i,x of streetAddressContext
        if x != '' and i < 6
          y.push x
      content = {
        streetAddress: y.join(' '),
        price: priceContext
      }
      outerRes.json { 'links': {}, 'data': [], 'included': [], 'content': content }
    return

  app.get '/', (req, outerRes, next) ->
    outerRes.render('index')
    return
  return

module.exports = homeRoute
