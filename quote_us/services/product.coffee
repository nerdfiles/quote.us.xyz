util = require('util')
OperationHelper = require('apac').OperationHelper
try
  q = require('Q')
catch
  q = require('q')

path = require('path')
fs = require('fs')
awsCredentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'awsCredentials.json')))

opHelper = new OperationHelper(awsCredentials)


product = () ->
  def = q.defer()

  opHelper.execute 'ItemSearch', {
    'SearchIndex'   : 'Books'
    'Keywords'      : 'Bitcoin'
    'ResponseGroup' : 'ItemAttributes,Offers'
  }, (err, results) ->
    def.resolve( results )
    return
  def.promise

module.exports = product
