
/**
@fileOverview ./APP/modules/Home/index.js
 */

(function() {
  var Product, fs, homeRoute, path;

  fs = require('fs');

  path = require('path');

  Product = require('../../services/product');

  homeRoute = function(app) {
    app.get('/api/v1/book/ideas', function(req, outerRes, next) {
      return Product().then(function(results) {
        return outerRes.json(results);
      });
    });
    app.get('/api/v1/:id', function(req, outerRes, next) {
      var id, mockProperty, processFile;
      id = req.params.id || '3513305';
      mockProperty = '/mocks/Property-' + id + '.json';
      fs.readFile(path.join(__dirname, '..', '..', mockProperty), 'utf-8', function(err, data) {
        var content;
        if (err) {
          throw err;
        }
        content = data;
        return processFile(content);
      });
      processFile = function(_content, _results) {
        var __content, content, i, num, priceContext, streetAddressContext, x, y;
        __content = JSON.parse(_content);
        streetAddressContext = __content[1][0].split(' ');
        num = __content[1][18].split('$')[1].split(',');
        priceContext = parseInt(num.join(''), 10);
        y = [];
        for (i in streetAddressContext) {
          x = streetAddressContext[i];
          if (x !== '' && i < 6) {
            y.push(x);
          }
        }
        content = {
          streetAddress: y.join(' '),
          price: priceContext
        };
        return outerRes.json({
          'links': {},
          'data': [],
          'included': [],
          'content': content
        });
      };
    });
    app.get('/', function(req, outerRes, next) {
      outerRes.render('index');
    });
  };

  module.exports = homeRoute;

}).call(this);
